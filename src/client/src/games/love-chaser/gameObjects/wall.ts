import { GamePlay } from "../scenes/gamePlay";

export default class Wall extends Phaser.GameObjects.Container {
  bricks: Array<Phaser.Physics.Arcade.Image> = [];

  constructor(
    public scene: GamePlay,
    public direction: string,
    public quantity: number
  ) {
    super(scene);
    scene.add.existing(this);

    this.init();

    this.scene.physics.add.collider(this.scene.player, this.bricks, () => {});
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
      if (this.direction === "vertical") {
        if (this.scene.player.x < this.x) {
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
          .image(x, y, "brick")
          .setImmovable(true)
          .setSize(100, 20)
          .setOffset(0, 20)
          .setTint(0x0d2336)
          .setDisplaySize(120, 80);

        x += 112;

        this.bricks.push(brick);
        this.add(brick);
      }
    }

    if (this.direction === "vertical") {
      let x = this.x;
      let y = this.y;

      for (let i = 0; i < this.quantity; i++) {
        const brick = this.scene.physics.add
          .image(x, y, "brick")
          .setRotation(1.57)
          .setImmovable(true)
          .setSize(50, 51)
          .setOffset(30, 0)
          .setTint(0x0d2336)
          .setDisplaySize(120, 80);

        y += 110;

        this.bricks.push(brick);
        this.add(brick);
      }
    }
  }
}
