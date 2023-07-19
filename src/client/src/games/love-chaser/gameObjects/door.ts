import { GamePlay } from "../scenes/gamePlay";

export class Door extends Phaser.Physics.Arcade.Image {
  greenColor = 0x41ff71;
  redColor = 0xf04f26;

  isOpen = false;

  collider!: Phaser.Physics.Arcade.Collider;

  constructor(public scene: GamePlay, x: number, y: number, public id: number) {
    super(scene, x, y, "default-image");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setImmovable(true);
    this.setDepth(-1);
    this.setDisplaySize(10, 140);
    this.setTint(this.redColor);

    this.collider = this.scene.physics.add.collider(this, [
      this.scene.player,
      this.scene.onlinePlayer,
    ]);
  }

  close() {
    this.scene.gameManager.ably.sendEvent(["doorClose", this.id.toString()]);
    this.isOpen = false;
    this.setTint(this.redColor);
    this.collider = this.scene.physics.add.collider(this, [
      this.scene.player,
      this.scene.onlinePlayer,
    ]);
  }

  open() {
    this.scene.gameManager.ably.sendEvent(["doorOpen", this.id.toString()]);
    this.isOpen = true;
    this.setTint(this.greenColor);
    this.collider.destroy();
  }
}
