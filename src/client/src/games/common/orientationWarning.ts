export class OrienttionWarning {
  constructor(public scene: Phaser.Scene) {
    this.init();
  }

  init() {
    const bacgkround = this.scene.add
      .image(0, 0, "white")
      .setDisplaySize(
        this.scene.game.canvas.width,
        this.scene.game.canvas.height
      );
  }
}
