import { calculatePercentage } from "../../tbilisi-batumi-1/helper/tatukaMath";
import { GamePlay } from "../scenes/gamePlay";

export default class Wall extends Phaser.GameObjects.Container {
  constructor(
    public scene: GamePlay,
    public direction: string,
    public quantity: number
  ) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.scene.events.on("update", () => {
      if (this.direction === "horizontal") {
        if (this.scene.player.y < this.y) {
          this.setDepth(120);
        } else {
          this.setDepth(0);
        }
      }
    });

    if (this.direction === "horizontal") {
      let x = this.x;
      let y = this.y;

      for (let i = 0; i < this.quantity; i++) {
        const brick = this.scene.physics.add
          .image(x, y, "border")
          .setImmovable(true)
          .setTint(0x0b292e);

        brick.setSize(brick.displayWidth, brick.displayHeight);
        brick.setOffset(0, 0);

        x += brick.displayWidth;

        this.scene.bricks.push(brick);
        this.add(brick);
      }
    }

    if (this.direction === "vertical") {
      let x = this.x;
      let y = this.y;

      for (let i = 0; i < this.quantity; i++) {
        const brick = this.scene.physics.add
          .image(x, y, "border")
          .setRotation(1.57)
          .setImmovable(true)
          .setTint(0x0b292e);

        brick.setSize(brick.displayHeight, brick.displayWidth);

        y += brick.displayWidth;

        this.scene.bricks.push(brick);
        this.add(brick);
      }
    }
  }
}
