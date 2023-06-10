import Matter from "matter-js";
import { GamePlay } from "../scenes/gamePlay";
import { getRandomFloat } from "../helper/tatukaMath";
import { colliderCategories } from "../helper/colliderCategories";

export class Asteroid {
  scene!: GamePlay;
  x!: number;
  y!: number;
  sign!: Phaser.GameObjects.Image;

  update!: NodeJS.Timeout;

  asteroid!: Phaser.Physics.Matter.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene as GamePlay;
    this.x = x;
    this.y = y;
    this.init();
  }

  init() {
    let scale = 1;

    this.asteroid = this.scene.matter.add
      .sprite(this.x, this.y, "asteroid", undefined, {
        gravityScale: new Phaser.Math.Vector2(0, 0.025),
        isStatic: true,
        isSensor: true,
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setDepth(-1);
    this.asteroid.play("asteroid_idle");

    this.asteroid.setCollisionCategory(colliderCategories[1]);
    this.asteroid.setCollidesWith(colliderCategories[2]);

    this.asteroid.setRectangle(35, 70, {
      isStatic: true,
      isSensor: true,
    });
    this.asteroid.setOrigin(0.5, 0.72);

    this.sign = this.scene.add
      .image(this.x, this.y, "white")
      .setDisplaySize(200, 5000)
      .setTint(0xff7d53)
      .setVisible(false)
      .setAlpha(0.3)
      .setDepth(-100);

    //add Collision Detection for Right Tire
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (pair.bodyB === this.asteroid.body) {
          if (pair.bodyA.label === "Body") {
            this.scene.car.playExplosionAnimation(true);
            this.reset();
          }
        }
      });
    });
  }

  startFallingAsteroid() {
    const radnomX = this.scene.car.carBody.x + 700 - getRandomFloat(0, 2000);
    this.asteroid.setPosition(radnomX, -getRandomFloat(0, 300));
    this.asteroid.setRotation(0);
    this.asteroid.setStatic(false);

    this.sign.setPosition(radnomX, this.asteroid.y);
  }

  startFalling() {
    this.sign.setVisible(true);
    this.startFallingAsteroid();
    this.update = setInterval(() => {
      if (this.asteroid.y > this.scene.car.carBody.y + 1100) {
        this.startFallingAsteroid();
      }
    }, 300);
  }

  stopFalling() {
    clearInterval(this.update);
    this.reset();
    this.sign.setVisible(false);
  }

  reset() {
    this.asteroid.setPosition(this.x, this.y - 800);
    if (this.asteroid.isStatic()) return;
    this.asteroid.setStatic(true);
  }
}
