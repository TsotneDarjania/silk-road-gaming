import { GameData } from "../core/gameData";
import { GamePlay } from "../scenes/gamePlay";
import { GamePlayInterface } from "../scenes/gameplayInterface";

export class GamePlayHeart extends Phaser.Physics.Arcade.Image {
  collider!: Phaser.Physics.Arcade.Collider;

  isDestroy = false;

  constructor(public scene: GamePlay, x: number, y: number, public id: number) {
    super(scene, x, y, "gameplay-heart");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setScale(0.04);
    this.setDepth(-1);
    this.addAnimation();
    this.addCollisionDetection();

    if (window.innerWidth < 1000) {
      this.addMobileController();
    }
  }

  addMobileController() {}

  addCollisionDetection() {
    this.collider = this.scene.physics.add.overlap(
      this,
      this.scene.player,
      () => {
        if (this.scene.gameManager.isOwner) return;
        this.addHeartScore();
      }
    );
  }

  addHeartScore() {
    this.isDestroy = true;
    this.scene.gameManager.ably.sendEvent(["addHeart", this.id.toString()]);

    this.setVisible(false);
    this.collider.destroy();
    GameData.guestHeartScore += 1;

    const gamePlayInterfaceScene = this.scene.scene.get(
      "GamePlayInterface"
    ) as GamePlayInterface;

    if (GameData.guestHeartScore === 1) {
      gamePlayInterfaceScene.heart_1.setVisible(true);
    }
    if (GameData.guestHeartScore === 2) {
      gamePlayInterfaceScene.heart_1.setVisible(true);
      gamePlayInterfaceScene.heart_2.setVisible(true);
    }
    if (GameData.guestHeartScore === 3) {
      gamePlayInterfaceScene.heart_1.setVisible(true);
      gamePlayInterfaceScene.heart_2.setVisible(true);
      gamePlayInterfaceScene.heart_3.setVisible(true);
      this.scene.gameManager.ably.sendEvent(["gameFinish", "guest"]);
    }
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
