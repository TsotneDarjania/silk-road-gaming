import { GameData } from "../core/gameData";
import { GamePlay } from "../scenes/gamePlay";

export class OnlinePlayer extends Phaser.Physics.Arcade.Sprite {
  speed = 200;
  direction = "none";

  character!: string;

  constructor(public scene: GamePlay, x: number, y: number, key: string) {
    super(scene, x, y, key);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.character = scene.gameManager.isOwner
      ? GameData.guestCharacter
      : GameData.ownerCharacter;

    this.init();

    this.play(`${this.character}-down-idle`);
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

      if (this.direction === "none") {
        this.anims.currentAnim.key !== `${this.character}-down-idle` &&
          this.play(`${this.character}-down-idle`);
      }

      if (
        this.direction === "up" ||
        this.direction === "leftUp" ||
        this.direction === "rightUp"
      ) {
        this.setVelocity(0, -this.speed);
        this.anims.currentAnim.key !== `${this.character}-up` &&
          this.play(`${this.character}-up`);
      }
      if (
        this.direction === "left" ||
        this.direction === "upLeft" ||
        this.direction === "downLeft"
      ) {
        this.setVelocity(-this.speed, 0);
        this.anims.currentAnim.key !== `${this.character}-left` &&
          this.play(`${this.character}-left`);
      }
      if (
        this.direction === "down" ||
        this.direction === "leftDown" ||
        this.direction === "rightDown"
      ) {
        this.setVelocity(0, this.speed);
        this.anims.currentAnim.key !== `${this.character}-down` &&
          this.play(`${this.character}-down`);
      }
      if (
        this.direction === "right" ||
        this.direction === "upRight" ||
        this.direction === "downRight"
      ) {
        this.setVelocity(this.speed, 0);
        this.anims.currentAnim.key !== `${this.character}-right` &&
          this.play(`${this.character}-right`);
      }
    });
  }
}
