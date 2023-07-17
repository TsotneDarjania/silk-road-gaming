import { GamePlay } from "../scenes/gamePlay";

export class GamePlayHeart extends Phaser.Physics.Arcade.Image {
  constructor(scene: GamePlay, x: number, y: number) {
    super(scene, x, y, "gameplay-heart");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setScale(0.04);
    this.setDepth(300);
    this.addAnimation();
  }

  addAnimation() {
    this.scene.tweens.add({
      targets: this,
      duration: 300,
      scale: 0.046,
      repeat: -1,
      yoyo: true,
    });
  }
}
