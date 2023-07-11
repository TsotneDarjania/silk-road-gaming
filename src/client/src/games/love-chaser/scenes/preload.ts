import WebFontFile from "../helper/webFontLoader";

export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`${process.env.PUBLIC_URL}/assets/games/love-chaser`);
    this.load.image("boyCharacter", "/images/boyCharacter.png");
    this.load.image("girlCharacter", "/images/girlCharacter.png");
    this.load.image("ground", "/images/ground.jpg");
    this.load.image("brick", "/images/brick.png");
    this.load.image("box-1", "/images/box-1.png");
    this.load.image("bed", "/images/bed.webp");
    this.load.image("table", "/images/table.png");
    this.load.image("bookshelf", "/images/bookshelf.png");

    this.load.image("boy-default", "/images/boy-default.png");
    this.load.image("girl-default", "/images/girl-default.png");

    this.load.image("default-image", "/images/white.png");

    //menu
    this.load.image("menu-heart", "/images/heart.png");
    this.load.image("button", "/images/button.png");

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

    //for georgian font
    // this.load.addFile(new WebFontFile(this.load, "Noto Sans Georgian"));
    //for eng font
    this.load.addFile(new WebFontFile(this.load, "Bungee"));
  }

  create() {
    this.scene.start("Menu");
  }
}
