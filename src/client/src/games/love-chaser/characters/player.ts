export class Player extends Phaser.Physics.Arcade.Image {
  speed = 200;
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setDisplaySize(100, 100);
    this.addController();
  }

  addController() {
    this.scene.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      (key: any) => {
        if (
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT ||
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.A
        ) {
          this.setVelocity(-this.speed, this.body.velocity.y);
        }
        if (
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT ||
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.D
        ) {
          this.setVelocity(this.speed, this.body.velocity.y);
        }
        if (
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.UP ||
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.W
        ) {
          this.setVelocity(this.body.velocity.x, -this.speed);
        }
        if (
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.DOWN ||
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.S
        ) {
          this.setVelocity(this.body.velocity.x, this.speed);
        }
      }
    );
    this.scene.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      (key: any) => {
        if (
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT ||
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.A
        ) {
          this.setVelocity(0, this.body.velocity.y);
        }
        if (
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT ||
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.D
        ) {
          this.setVelocity(0, this.body.velocity.y);
        }
        if (
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.UP ||
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.W
        ) {
          this.setVelocity(this.body.velocity.x, 0);
        }
        if (
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.DOWN ||
          key.keyCode === Phaser.Input.Keyboard.KeyCodes.S
        ) {
          this.setVelocity(this.body.velocity.x, 0);
        }
      }
    );
  }
}
