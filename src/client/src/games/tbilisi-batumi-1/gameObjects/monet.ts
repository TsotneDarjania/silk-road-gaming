import { GameMenu } from "../ui/menu/gameMenu";

export class Monet extends Phaser.GameObjects.Image {
  gamePlayMenuScene!: GameMenu;
  value!: number;

  zone!: MatterJS.BodyType;

  isUsed: boolean = false;

  soundEffect!: Phaser.Sound.BaseSound;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    value: number,
    gameplayMenuScene: GameMenu
  ) {
    super(scene, x, y, key);
    this.scene.add.existing(this);
    this.gamePlayMenuScene = gameplayMenuScene;
    this.value = value;

    this.init();
  }

  init() {
    this.setScale(0.09);

    this.addZone();
    this.addAnimation();
    this.addSoundEffect();
  }

  addSoundEffect() {
    this.soundEffect = this.scene.sound.add("monetSound", { volume: 0.7 });
  }

  addAnimation() {
    this.scene.tweens.add({
      targets: this,
      scale: 0.094,
      duration: 200,
      repeat: Infinity,
      yoyo: true,
    });
  }

  addZone() {
    this.zone = this.scene.matter.add.circle(this.x, this.y, 20, {
      ignoreGravity: true,
      collisionFilter: {
        category: 0x0001,
        mask: 0x0002,
      },
      isSensor: true,
    });

    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (pair.bodyB === this.zone) {
          if (this.isUsed === false) {
            this.soundEffect.play();
            this.gamePlayMenuScene.increaseMoney(this.value);
            this.isUsed = true;
          }
          this.setVisible(false);
        }
      });
    });
  }
}
