import { GamePlay } from "../scenes/gamePlay";

export class ClubLight extends Phaser.GameObjects.Container {
  lightDevice!: Phaser.GameObjects.Image;
  lightEffect!: Phaser.GameObjects.Image;

  constructor(
    scene: GamePlay,
    x: number,
    y: number,
    public lightColor: number
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setDepth(300);

    this.addLightEffect();
    this.addDevice();

    // this.setOrigin(0.5, 0.1);
    // this.setTint(this.lightColor);
  }

  addDevice() {
    this.lightDevice = this.scene.add
      .image(-20, -40, "light-device")
      .setOrigin(0.5, 0.3);
    this.add(this.lightDevice);
  }

  addLightEffect() {
    this.lightEffect = this.scene.add
      .image(0, 0, "light-effect")
      .setTint(this.lightColor)
      .setOrigin(0.5, 0.1);
    this.add(this.lightEffect);
  }

  startAnimation(duration: number) {
    this.scene.tweens.add({
      targets: this,
      rotation: {
        from: -0.5,
        to: 0.5,
      },
      duration: duration,
      repeat: -1,
      yoyo: true,
    });

    this.scene.tweens.add({
      targets: this.lightEffect,
      alpha: 0,
      duration: duration / 4,
      repeat: -1,
      yoyo: true,
    });
  }
}
