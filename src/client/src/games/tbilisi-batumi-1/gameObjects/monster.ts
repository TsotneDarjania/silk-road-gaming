import { colliderCategories } from "../helper/colliderCategories";
import { GamePlay } from "../scenes/gamePlay";

export class Monster {
  body!: Phaser.Physics.Matter.Sprite;

  constructor(
    public scene: GamePlay,
    public x: number,
    public y: number,
    public jumpStrong: number
  ) {
    this.init();
  }

  init() {
    this.addBody();
  }

  addBody() {
    this.body = this.scene.matter.add.sprite(
      this.x,
      this.y,
      "monster",
      undefined,
      {
        shape: {
          type: "circle",
          radius: 35,
          friction: 0,
          restitution: 0,
        },
      } as Phaser.Types.Physics.Matter.MatterBodyConfig
    );

    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (pair.bodyB.gameObject !== null) {
          if (pair.bodyB.gameObject === this.body) {
            this.jump();
          }

          if (
            pair.bodyA.gameObject === this.scene.car.carBody &&
            pair.bodyB.gameObject === this.body
          ) {
            this.scene.car.playExplosionAnimation(true);
          }
        }
      });
    });
  }

  jump() {
    this.body.setVelocity(0, this.jumpStrong);
  }
}
