import { colliderCategories } from "../helper/colliderCategories";
import { calculatePercentage, getRandomFloat } from "../helper/tatukaMath";
import { GamePlay } from "../scenes/gamePlay";

export class Car {
  carMeshe: any;
  scene!: GamePlay;
  x!: number;
  y!: number;

  isMoving = false;
  onGround = true;
  canMoving = true;
  isCarExplosion = false;
  isUpsideDown = false;
  stopUpdateProcess = false;
  withCarSound = false;

  looseWaitTime = 300;

  allObjects: Array<Phaser.Physics.Matter.Sprite> = [];
  bags: Array<Phaser.Physics.Matter.Sprite> = [];

  carBody!: Phaser.Physics.Matter.Sprite;
  leftTire!: Phaser.Physics.Matter.Sprite;
  rightTire!: Phaser.Physics.Matter.Sprite;

  isAcceleratingLeft = false;
  isAcceleratingRight = false;

  explosionSound!: Phaser.Sound.BaseSound;
  evilLaughSound!: Phaser.Sound.BaseSound;

  carEngineSound_1!: Phaser.Sound.BaseSound;

  constructor(scene: GamePlay, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.carEngineSound_1 = scene.carEngine;

    this.carMeshe = this.scene.cache.json.get("carMeshe");

    this.init();
    // becouse default car image is rotat to Right
    this.rotateToLeft();
  }

  init() {
    this.addCarBody();
    this.addCarTires();
    this.addBags();
    this.addController();
    this.addBoy();
    this.addSoundEffects();
  }

  addSoundEffects() {
    this.explosionSound = this.scene.sound.add("carExplotionSound", {
      volume: 1,
    });
    this.evilLaughSound = this.scene.sound.add("evilLaughSound", {
      volume: 1,
    });
  }

  addBoy() {
    const charachter = this.scene.matter.add
      .sprite(this.x, this.y, "carBoy", undefined, {
        shape: {
          type: "circle",
          radius: 12,
        },
        isSensor: false,
        ignoreGravity: false, // Make the tire not be affected by gravity
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setOrigin(0.5)
      .setFlip(true, false)
      .setDepth(-1);

    charachter.setCollisionCategory(colliderCategories[2]);
    charachter.setCollidesWith(colliderCategories[1]);

    this.allObjects.push(charachter);

    // Connect left tire to car body using a constraint
    const leftTireConstraint = this.scene.matter.add.constraint(
      charachter.body as MatterJS.BodyType,
      //@ts-ignore
      this.carBody,
      2, // Length of the constraint
      0, // Stiffness of the constraint (0 = not stiff at all)
      {
        pointA: { x: -0, y: 0 }, // Local offset of constraint point on left tire
        pointB: { x: 2, y: -20 }, // Local offset of constraint point on car body
      }
    );
  }

  rotateToLeft() {
    let scaleX = this.carBody.scaleX;
    this.carBody.setScale(-scaleX, 1);
  }

  resetCar(saveX: number, saveY: number) {
    this.x = saveX;
    this.y = saveY;

    this.carBody.setStatic(true);
    this.carBody.setPosition(saveX, saveY);
    this.carBody.setRotation(0);

    this.leftTire.setPosition(saveX - 43, saveY + 30);
    this.rightTire.setPosition(saveX + 79, saveY + 30);
    this.leftTire.setRotation(0);
    this.rightTire.setRotation(0);

    this.bags.forEach((bag) => {
      bag.destroy(true);
    });

    this.allObjects.forEach((object) => {
      object.setVisible(true);
    });

    this.stopUpdateProcess = false;
    this.canMoving = true;
    this.isCarExplosion = false;
    this.onGround = true;
    this.looseWaitTime = 300;
  }

  checkCarRotation() {
    if (this.carBody.angle < -41 || this.carBody.angle > 41) {
      this.isUpsideDown = true;
    } else {
      this.isUpsideDown = false;
    }
  }

  checkLoose() {
    if (this.isUpsideDown) {
      this.looseWaitTime -= 1;
    } else {
      this.looseWaitTime = 300;
    }

    if (this.looseWaitTime < 0 && this.isCarExplosion === false) {
      this.stopUpdateProcess = true;
      this.scene.gameManager.loose("upsideDown");
    }

    if (this.isCarExplosion) {
      this.scene.gameManager.loose("fireExplotion");
    }
  }

  carMotionManager(maxSpeed: number, accelerationRate: number) {
    if (this.isUpsideDown || this.onGround === false) {
      this.canMoving = false;
    } else {
      this.canMoving = true;
    }
    if (this.canMoving && this.onGround) {
      if (this.isAcceleratingLeft && this.carBody.body.velocity.x > -maxSpeed) {
        const force = new Phaser.Math.Vector2(-accelerationRate, 0);
        this.carBody.applyForce(force);
      }

      if (this.isAcceleratingRight && this.carBody.body.velocity.x < maxSpeed) {
        const force = new Phaser.Math.Vector2(accelerationRate, 0);
        this.carBody.applyForce(force);
      }
    }

    if (this.carBody.body.velocity.y < -8) {
      this.carBody.setVelocity(this.carBody.body.velocity.x, 0);
    }

    if (
      this.carBody.x >
      this.scene.gameManager.saveZonesData[this.scene.gameManager.saveZoneIndex]
        .carPositions.x +
        1000
    ) {
      const force = new Phaser.Math.Vector2(-0.2, 0);
      this.carBody.applyForce(force);
    }
  }

  addController() {
    let accelerationRate = 0.005;
    let maxSpeed = 30;

    this.scene.input.keyboard.on("keydown-LEFT", () => {
      this.isAcceleratingLeft = true;
      this.isMoving = true;
    });

    this.scene.input.keyboard.on("keyup-LEFT", () => {
      this.isAcceleratingLeft = false;
      this.isMoving = false;
    });

    this.scene.input.keyboard.on("keydown-RIGHT", () => {
      this.isAcceleratingRight = true;
      this.isMoving = true;
    });

    this.scene.input.keyboard.on("keyup-RIGHT", () => {
      this.isAcceleratingRight = false;
      this.isMoving = false;
    });

    this.scene.events.on("update", () => {
      if (this.stopUpdateProcess === false) {
        this.checkCarRotation();
        this.carMotionManager(maxSpeed, accelerationRate);
        this.checkLoose();

        if (this.withCarSound) {
          if (this.carEngineSound_1.isPlaying === false) {
            this.carEngineSound_1.play();
          } else {
            let soundRate = Math.abs(
              Number((this.carBody.body.velocity.x / 5).toFixed(1))
            );
            if (soundRate === 0) return;
            //@ts-ignore
            this.carEngineSound_1.rate = soundRate;
          }
        }

        this.leftTire.rotation += this.carBody.body.velocity.x / 25;
        this.rightTire.rotation += this.carBody.body.velocity.x / 25;
      }
    });
  }

  addCarBody() {
    this.carBody = this.scene.matter.add.sprite(
      this.x,
      this.y,
      "carBody",
      undefined,
      {
        render: { sprite: { xOffset: 0, yOffset: 0 } },
        friction: 0,
        restitution: 0,
        frictionAir: 0.006,
        shape: this.carMeshe.carBody,
        slop: 0, // increased slop value
        chamfer: {
          quality: 30, // increased chamfer quality
          radius: 10,
        },
        sleepThreshold: 100,
      } as Phaser.Types.Physics.Matter.MatterBodyConfig
    );
    this.allObjects.push(this.carBody);
    this.carBody.setCollisionCategory(colliderCategories[2]);
    this.carBody.setCollidesWith(colliderCategories[1] | colliderCategories[3]);
  }

  addCarTires() {
    this.leftTire = this.scene.matter.add
      .sprite(this.x - 43, this.y + 30, "carTire", undefined, {
        shape: {
          type: "circle",
          radius: 17,
          friction: 0,
          restitution: 0,
        },
        render: { sprite: { xOffset: 0, yOffset: 0 } },
        isSensor: false,
        ignoreGravity: false, // Make the tire not be affected by gravity
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setOrigin(0.509, 0.49);
    this.allObjects.push(this.leftTire);
    this.leftTire.setCollisionCategory(colliderCategories[2]);
    this.leftTire.setCollidesWith(colliderCategories[1]);

    // Connect left tire to car body using a constraint
    const leftTireConstraint = this.scene.matter.add.constraint(
      this.leftTire.body as MatterJS.BodyType,
      //@ts-ignore
      this.carBody,
      0, // Length of the constraint
      0, // Stiffness of the constraint (0 = not stiff at all)
      {
        pointA: { x: -0, y: 0 }, // Local offset of constraint point on left tire
        pointB: { x: -71, y: 26 }, // Local offset of constraint point on car body
      }
    );
    //add Collision Detection for Right Tire
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        // Check if the colliders in this pair belong to the leftTire sprite
        if (
          pair.bodyA === this.leftTire.body ||
          pair.bodyB === this.leftTire.body
        ) {
          this.onGround = true;
        }
      });
    });

    this.rightTire = this.scene.matter.add
      .sprite(this.x + 79, this.y + 30, "carTire", undefined, {
        shape: {
          type: "circle",
          radius: 17,
          friction: 0,
          restitution: 0,
        },
        render: { sprite: { xOffset: 0, yOffset: 0 } },
        isSensor: false, // Make the tire not generate collision responses
        ignoreGravity: false, // Make the tire not be affected by gravity
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setOrigin(0.509, 0.49);
    this.allObjects.push(this.rightTire);
    this.rightTire.setCollisionCategory(colliderCategories[2]);
    this.rightTire.setCollidesWith(colliderCategories[1]);

    // Connect right tire to car body using a constraint
    const rightTireConstraint = this.scene.matter.add.constraint(
      this.rightTire.body as MatterJS.BodyType,
      //@ts-ignore
      this.carBody,
      0, // Length of the constraint
      0, // Stiffness of the constraint (0 = not stiff at all)
      {
        pointA: { x: -0, y: 0 }, // Local offset of constraint point on left tire
        pointB: { x: 55, y: 26 }, // Local offset of constraint point on car body
      }
    );

    //add Collision Detection for Right Tire
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        // Check if the colliders in this pair belong to the leftTire sprite
        if (
          pair.bodyA === this.rightTire.body ||
          pair.bodyB === this.rightTire.body
        ) {
          this.onGround = true;
        }
      });
    });
    this.scene.matter.world.on("collisionend", (event: any) => {
      event.pairs.forEach((pair: any) => {
        // Check if the colliders in this pair belong to the leftTire sprite
        if (
          pair.bodyA === this.rightTire.body ||
          pair.bodyB === this.rightTire.body
        ) {
          // console.log(this.carBody.rotation)
          if (this.carBody.angle < -38) {
            this.onGround = false;
          }
          //
        }
      });
    });
  }

  addBags() {
    this.bags[0] = this.scene.matter.add
      .sprite(this.x + 60, this.y - 20, "carBag", undefined, {
        isStatic: false,
        shape: this.carMeshe.bag,
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(1.3)
      .setDepth(-1);
    this.allObjects.push(this.bags[0]);

    this.bags[1] = this.scene.matter.add
      .sprite(this.x + 60, this.y - 30, "carBag", undefined, {
        isStatic: false,
        shape: this.carMeshe.bag,
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(1.1)
      .setDepth(-1);
    this.allObjects.push(this.bags[1]);

    this.bags[2] = this.scene.matter.add
      .sprite(this.x + 80, this.y - 30, "carBag", undefined, {
        isStatic: false,
        shape: this.carMeshe.bag,
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(1.1)
      .setDepth(-1);
    this.allObjects.push(this.bags[2]);

    //Set collision Group
    this.bags.forEach((bag) => {
      bag.setCollisionCategory(colliderCategories[3]);
      bag.setCollidesWith(colliderCategories[2] | colliderCategories[3]);
    });
  }

  playExplosionAnimation(withEvilsound: boolean) {
    if (this.stopUpdateProcess === false) {
      //Hide Car objects
      this.allObjects.forEach((object) => {
        object.setVisible(false);
      });

      this.scene.gameMenu.speedometerContainer.setVisible(false);

      this.explosionSound.play();
      if (withEvilsound) this.evilLaughSound.play();

      this.stopUpdateProcess = true;

      // play 5 explosion animations during each touch
      let carExplosions: Array<Phaser.GameObjects.Sprite> = [];
      for (let i = 0; i < 5; i++) {
        let x = this.carBody.x;
        let y = this.carBody.y;
        const explotion = this.scene.add
          .sprite(
            x + getRandomFloat(-80, 80),
            y + getRandomFloat(-50, 50),
            "carExplotion"
          )
          .setScale(getRandomFloat(0.1, 1.7));
        carExplosions.push(explotion);
        explotion.play("car_explotion");
      }

      carExplosions[4].on("animationcomplete", () => {
        carExplosions.forEach((explotion) => {
          explotion.destroy(true);
        });

        this.isCarExplosion = true;
        this.checkLoose();
      });
    }
  }
}
