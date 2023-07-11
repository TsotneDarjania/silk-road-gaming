export class OnlinePlayer extends Phaser.Physics.Arcade.Sprite {
  speed = 200;
  direction = "none";

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.init();

    this.play("down-idle");
  }

  init() {
    this.setDisplaySize(100, 100);
    this.addController();

    this.setSize(35, 25);
    this.setOffset(20, 55);
  }

  addController() {
    this.scene.events.on("update", () => {
      this.setVelocity(0);

      if (
        this.direction === "up" ||
        this.direction === "leftUp" ||
        this.direction === "rightUp"
      ) {
        this.setVelocity(0, -this.speed);
        this.anims.currentAnim.key !== "boy-up" && this.play("boy-up");
      }
      if (
        this.direction === "left" ||
        this.direction === "upLeft" ||
        this.direction === "downLeft"
      ) {
        this.setVelocity(-this.speed, 0);
        this.anims.currentAnim.key !== "boy-left" && this.play("boy-left");
      }
      if (
        this.direction === "down" ||
        this.direction === "leftDown" ||
        this.direction === "rightDown"
      ) {
        this.setVelocity(0, this.speed);
        this.anims.currentAnim.key !== "boy-down" && this.play("boy-down");
      }
      if (
        this.direction === "right" ||
        this.direction === "upRight" ||
        this.direction === "downRight"
      ) {
        this.setVelocity(this.speed, 0);
        this.anims.currentAnim.key !== "boy-right" && this.play("boy-right");
      }
    });
  }
}
