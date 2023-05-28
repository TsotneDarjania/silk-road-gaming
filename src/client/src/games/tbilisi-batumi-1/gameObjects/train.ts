import { colliderCategories } from "../helper/colliderCategories";
import { getRandomFloat } from "../helper/tatukaMath";
import { GamePlay } from "../scenes/gamePlay";

export class Train {
  frontVagon!: Phaser.Physics.Matter.Sprite;
  backVagon!: Phaser.Physics.Matter.Sprite;

  leftCircle!: Phaser.Physics.Matter.Sprite;
  rightCircle!: Phaser.Physics.Matter.Sprite;

  canMoving = false;
  isAcceleratingLeft = false;
  isAcceleratingRight = false;

  vagonConnectConstraint!: MatterJS.ConstraintType;
  carLeftConstrint!: MatterJS.ConstraintType;
  carRightConstrint!: MatterJS.ConstraintType;

  constructor(public scene: GamePlay, public x: number, public y: number) {
    this.init();
  }

  init() {
    this.addBackVagon();
    this.addFrontVagon();
    this.addCircles();

    this.addZoneForCar();
  }

  addZoneForCar() {
    const zone = this.scene.matter.add.rectangle(
      this.x + 300,
      this.y,
      100,
      500,
      {
        isStatic: true,
        isSensor: true,
      }
    );

    zone.collisionFilter.category = colliderCategories[1];
    zone.collisionFilter.mask = colliderCategories[1] | colliderCategories[2];

    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (
          pair.bodyB === zone &&
          pair.bodyA.gameObject === this.scene.car.carBody
        ) {
          this.scene.matter.world.remove(zone);
          this.startMotion();
        }
      });
    });
  }

  stopMotion() {
    this.canMoving = false;
    this.scene.matter.world.remove(this.vagonConnectConstraint);
    this.scene.matter.world.remove(this.carLeftConstrint);
    this.scene.matter.world.remove(this.carRightConstrint);
  }

  startMotion() {
    this.scene.gameManager.startTrainMotion();
    this.canMoving = true;
    this.addController();

    this.carLeftConstrint = this.scene.matter.add.constraint(
      this.backVagon.body as MatterJS.BodyType,
      //@ts-ignore
      this.scene.car.carBody,
      1, // Length of the constraint
      0.2, // Stiffness of the constraint (0 = not stiff at all)
      {
        pointA: { x: -70, y: -120 }, // Local offset of constraint point on left tire
        pointB: { x: -40, y: -36 }, // Local offset of constraint point on car body
      }
    );

    this.carRightConstrint = this.scene.matter.add.constraint(
      this.backVagon.body as MatterJS.BodyType,
      //@ts-ignore
      this.scene.car.carBody,
      1, // Length of the constraint
      0.2, // Stiffness of the constraint (0 = not stiff at all)
      {
        pointA: { x: 0, y: -120 }, // Local offset of constraint point on left tire
        pointB: { x: 20, y: -36 }, // Local offset of constraint point on car body
      }
    );
  }

  // "x": -284053,

  addController() {
    let accelerationRate = 0.02;
    let maxSpeed = 480;

    this.scene.input.keyboard.on("keydown-LEFT", () => {
      this.isAcceleratingLeft = true;
    });

    this.scene.input.keyboard.on("keyup-LEFT", () => {
      this.isAcceleratingLeft = false;
    });

    this.scene.input.keyboard.on("keydown-RIGHT", () => {
      this.isAcceleratingRight = true;
    });

    this.scene.input.keyboard.on("keyup-RIGHT", () => {
      this.isAcceleratingRight = false;
    });

    this.scene.events.on("update", () => {
      if (this.canMoving) {
        this.leftCircle.rotation += this.frontVagon.body.velocity.x / 35;
        this.rightCircle.rotation += this.frontVagon.body.velocity.x / 35;

        if (
          this.isAcceleratingLeft &&
          this.frontVagon.body.velocity.x > -maxSpeed
        ) {
          const force = new Phaser.Math.Vector2(-accelerationRate, 0);
          this.frontVagon.applyForce(force);
        }

        if (
          this.isAcceleratingRight &&
          this.frontVagon.body.velocity.x < maxSpeed
        ) {
          const force = new Phaser.Math.Vector2(accelerationRate, 0);
          this.frontVagon.applyForce(force);
        }
      }
    });
  }

  addFrontVagon() {
    this.frontVagon = this.scene.matter.add
      .sprite(this.x, this.y, "train", undefined, {})
      .setScale(0.18);

    this.frontVagon.setRectangle(365, 150, {
      isStatic: false,
      friction: 0,
      restitution: 0,
      frictionAir: 0,
    });
    this.frontVagon.setOrigin(0.445, 0.65);

    this.frontVagon.setFixedRotation();

    this.vagonConnectConstraint = this.scene.matter.add.constraint(
      this.frontVagon.body as MatterJS.BodyType,
      //@ts-ignore
      this.backVagon,
      30, // Length of the constraint
      0.05, // Stiffness of the constraint (0 = not stiff at all)
      {
        pointA: { x: 194, y: 0 }, // Local offset of constraint point on left tire
        pointB: { x: -200, y: -40 }, // Local offset of constraint point on car body
      }
    );

    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (
          pair.bodyA.gameObject === null &&
          pair.bodyB.gameObject === this.frontVagon
        ) {
          this.stopMotion();
          this.frontVagon.setVisible(false);
          this.scene.matter.world.remove(this.frontVagon);
          this.backVagon.setVisible(false);
          this.scene.matter.world.remove(this.backVagon);
          this.leftCircle.setVisible(false);
          this.scene.matter.world.remove(this.leftCircle);
          this.rightCircle.setVisible(false);
          this.scene.matter.world.remove(this.rightCircle);

          this.scene.gameManager.stopTrainMotion();

          let frontExplosions: Array<Phaser.GameObjects.Sprite> = [];
          for (let i = 0; i < 5; i++) {
            let x = this.frontVagon.x;
            let y = this.frontVagon.y;
            const explotion = this.scene.add
              .sprite(
                x + getRandomFloat(-80, 80),
                y + getRandomFloat(-50, 50),
                "carExplotion"
              )
              .setScale(getRandomFloat(0.1, 1.7));
            frontExplosions.push(explotion);
            explotion.play("car_explotion");
          }

          frontExplosions[4].on("animationcomplete", () => {
            frontExplosions.forEach((explotion) => {
              explotion.destroy(true);
            });
          });

          let backExplosions: Array<Phaser.GameObjects.Sprite> = [];
          for (let i = 0; i < 5; i++) {
            let x = this.backVagon.x;
            let y = this.backVagon.y;
            const explotion = this.scene.add
              .sprite(
                x + getRandomFloat(-80, 80),
                y + getRandomFloat(-50, 50),
                "carExplotion"
              )
              .setScale(getRandomFloat(0.1, 1.7));
            backExplosions.push(explotion);
            explotion.play("car_explotion");
          }

          backExplosions[4].on("animationcomplete", () => {
            backExplosions.forEach((explotion) => {
              explotion.destroy(true);
            });
          });
        }
      });
    });
  }

  addBackVagon() {
    this.backVagon = this.scene.matter.add
      .sprite(this.x + 410, this.y + 24, "vagon", undefined, {})
      .setScale(0.25);

    this.backVagon.setRectangle(400, 70, {
      isStatic: false,
      friction: 0,
      restitution: 0,
      frictionAir: 0,
    });
    this.backVagon.setOrigin(0.53, 0.75);

    this.backVagon.setFixedRotation();
  }

  addCircles() {
    this.leftCircle = this.scene.matter.add
      .sprite(this.x + 50, this.y + 168, "train-circle", undefined, {
        isSensor: true,
      })
      .setScale(0.13);

    const leftConstraint = this.scene.matter.add.constraint(
      this.frontVagon.body as MatterJS.BodyType,
      //@ts-ignore
      this.leftCircle,
      0, // Length of the constraint
      0, // Stiffness of the constraint (0 = not stiff at all)
      {
        pointA: { x: 48, y: 54 }, // Local offset of constraint point on left tire
        pointB: { x: 0, y: 0 }, // Local offset of constraint point on car body
      }
    );

    this.rightCircle = this.scene.matter.add
      .sprite(this.x + 143, this.y + 168, "train-circle", undefined, {
        isSensor: true,
      })
      .setScale(0.13);

    const rightConstraint = this.scene.matter.add.constraint(
      this.frontVagon.body as MatterJS.BodyType,
      //@ts-ignore
      this.rightCircle,
      0, // Length of the constraint
      0, // Stiffness of the constraint (0 = not stiff at all)
      {
        pointA: { x: 143, y: 54 }, // Local offset of constraint point on left tire
        pointB: { x: 0, y: 0 }, // Local offset of constraint point on car body
      }
    );
  }
}
