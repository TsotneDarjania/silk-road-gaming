export class Player extends Phaser.Physics.Arcade.Sprite {
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
  }

  addController() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    this.scene.events.on("update", () => {
      this.setVelocity(0);

      const { left, right, up, down } = cursors;

      if (left.isDown) {
        if (this.direction === "up") {
          this.direction = "upLeft";
        }
        if (this.direction === "none") {
          this.direction = "left";
        }
        if (this.direction === "down") {
          this.direction = "downLeft";
        }
      }
      if (right.isDown) {
        if (this.direction === "down") {
          this.direction = "downRight";
        }
        if (this.direction === "none") {
          this.direction = "right";
        }
        if (this.direction === "up") {
          this.direction = "upRight";
        }
      }
      if (up.isDown) {
        if (this.direction === "left") {
          this.direction = "leftUp";
        }
        if (this.direction === "none") {
          this.direction = "up";
        }
        if (this.direction === "right") {
          this.direction = "rightUp";
        }
      }
      if (down.isDown) {
        if (this.direction === "right") {
          this.direction = "rightDown";
        }
        if (this.direction === "none") {
          this.direction = "down";
        }
        if (this.direction === "left") {
          this.direction = "leftDown";
        }
      }

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

    this.scene.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      (key: any) => {
        this.direction = "none";
        this.play("down-idle");
      }
    );
  }
}
