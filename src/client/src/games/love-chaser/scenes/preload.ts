export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`${process.env.PUBLIC_URL}/assets/games/love-chaser`);
    this.load.image("boyCharacter", "/images/boyCharacter.png")
    this.load.image("girlCharacter", "/images/girlCharacter.png")
    this.load.image("map", "/images/map.png")
  }

  create() {
    this.scene.start("GamePlay")
  }
}
