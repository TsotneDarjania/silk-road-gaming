import { screenSize } from "../../config/layoutConfig";

export class GamePlayButton extends Phaser.GameObjects.Container {
  backgroundImage!: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public innerText: string,
    public textColor: string
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBacgrkoundImage();
    this.addText();

    this.makeInteractive();
  }

  addBacgrkoundImage() {
    this.backgroundImage = this.scene.add
      .image(0, 0, "gamePlayButton")
      .setDisplaySize(
        screenSize().gamePlay.gamePlayButton.width,
        screenSize().gamePlay.gamePlayButton.height
      );

    this.add(this.backgroundImage);
  }

  addText() {
    const text = this.scene.add
      .text(0, 0, this.innerText, {
        align: "center",
        fontSize: screenSize().gamePlay.gamePlayButton.fontSize,
        color: this.textColor,
        fontFamily: "Bungee",
      })
      .setOrigin(0.5);

    this.add(text);
  }

  makeInteractive() {
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -this.getBounds().width / 2,
        -this.getBounds().height / 2,
        this.getBounds().width,
        this.getBounds().height
      ),
      Phaser.Geom.Rectangle.Contains
    );
    this.input.cursor = "pointer";
  }
}
