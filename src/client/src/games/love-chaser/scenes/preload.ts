export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`${process.env.PUBLIC_URL}/assets/games/love-chaser`);
    this.load.image("boyCharacter", "/images/boyCharacter.png");
    this.load.image("girlCharacter", "/images/girlCharacter.png");
    this.load.image("ground", "/images/ground.jpg");

    this.load.spritesheet("boy-down", "/spritesheets/boy-down.png", {
      frameWidth: 86,
      frameHeight: 80,
    });
    this.load.spritesheet("boy-left", "/spritesheets/boy-left.png", {
      frameWidth: 86,
      frameHeight: 80,
    });
    this.load.spritesheet("boy-right", "/spritesheets/boy-right.png", {
      frameWidth: 86,
      frameHeight: 80,
    });
    this.load.spritesheet("boy-up", "/spritesheets/boy-up.png", {
      frameWidth: 86,
      frameHeight: 80,
    });

    this.load.spritesheet("down-idle", "/spritesheets/down-idle.png", {
      frameWidth: 82,
      frameHeight: 80,
    });
  }

  create() {
    this.scene.start("GamePlay");
  }
}
