import { GameData } from "../core/gameData";
import { GamePlay } from "../scenes/gamePlay";

export class Player extends Phaser.Physics.Arcade.Sprite {
  speed = 200;
  direction = "none";

  canMotion = true;

  character!: string;

  walkSound!: Phaser.Sound.BaseSound;

  constructor(public scene: GamePlay, x: number, y: number, key: string) {
    super(scene, x, y, key);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.character = scene.gameManager.isOwner
      ? GameData.ownerCharacter
      : GameData.guestCharacter;
    this.init();

    this.play(`${this.character}-down-idle`);
  }

  init() {
    this.setDisplaySize(100, 100);
    this.addController();
    this.addSoundEffects();

    this.setSize(43, 30);
    this.setOffset(9, 48);

    if (this.character === "girl") {
      this.setSize(48, 30);
      this.setOffset(2, 48);
    } else {
      this.setSize(37, 30);
      this.setOffset(16, 48);
    }

    if (this.scene.gameManager.isOwner) this.speed = 270;
  }

  addSoundEffects() {
    this.walkSound = this.scene.sound.add("walkSound", {
      volume: 0.1,
      loop: true,
      rate: 2.5,
    });
  }

  addController() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    this.scene.events.on("update", () => {
      this.setVelocity(0);

      if (this.direction !== "none" && this.walkSound.isPlaying === false) {
        this.walkSound.play();
      }

      if (this.direction === "none" && this.walkSound.isPlaying) {
        this.walkSound.stop();
      }

      const { left, right, up, down } = cursors;

      if (this.canMotion === false) return;

      if (left.isDown) {
        switch (this.direction) {
          case "up":
            this.direction = "upLeft";
            break;
          case "none":
            this.direction = "left";
            break;
          case "down":
            this.direction = "downLeft";
            break;
        }
      }
      if (right.isDown) {
        switch (this.direction) {
          case "down":
            this.direction = "downRight";
            break;
          case "none":
            this.direction = "right";
            break;
          case "up":
            this.direction = "upRight";
            break;
        }
      }
      if (up.isDown) {
        switch (this.direction) {
          case "left":
            this.direction = "leftUp";
            break;
          case "none":
            this.direction = "up";
            break;
          case "right":
            this.direction = "rightUp";
            break;
        }
      }
      if (down.isDown) {
        switch (this.direction) {
          case "right":
            this.direction = "rightDown";
            break;
          case "none":
            this.direction = "down";
            break;
          case "left":
            this.direction = "leftDown";
            break;
        }
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

    this.scene.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      (key: any) => {
        this.direction = "none";
        this.play(`${this.character}-down-idle`);
      }
    );
  }

  stopPlayer() {
    this.direction = "none";
    this.play(`${this.character}-down-idle`);
  }
}
