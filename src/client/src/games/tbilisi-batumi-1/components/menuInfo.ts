import { Menu } from "../scenes/menu";

export class MenuInfo extends Phaser.GameObjects.Container {
  background!: Phaser.GameObjects.DOMElement;
  closeImage!: Phaser.GameObjects.DOMElement;

  constructor(public scene: Menu) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setVisible(false);

    this.addBackground();
    this.addCloseImage();
    this.addText();
  }

  addText() {
    const mainDiv = this.scene.add.dom(
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      "div",
      "width : 74vw; height : 90vh;"
    );

    const text = this.scene.add
      .dom(
        0,
        20,
        "p",
        "color : white; font-size : 30px; text-align: center; width : 97%;",
        "Welcome to an extraordinary adventure!  Embark on a surreal journey in this unique game where you take the wheel " +
          "of a car and traverse the distance from the vibrant city of Tbilisi to the enchanting Batumi. " +
          "Prepare yourself to encounter a myriad of obstacles along the way." +
          "Dear players, please keep in mind that this version serves as a demo project" +
          " offering a glimpse into the vast potential of a magnificent game that awaits in the future." +
          " We are dedicated to crafting an immersive travel experience of remarkable proportions" +
          " Best of all, this game is completely free! Enjoy the ride and have an amazing gaming experience!"
      )
      .setOrigin(0);

    mainDiv.node.appendChild(text.node as HTMLInputElement);

    this.add(mainDiv);
  }

  addCloseImage() {
    this.closeImage = this.scene.add
      .dom(20, 20, "img", "cursor: pointer; width : 80px; height : 80px")
      .setOrigin(0)
      .setInteractive();

    this.closeImage.node.addEventListener("click", () => {
      this.scene.buttonSound.play();
      this.scene.menuButtonsContainer.setVisible(true);
      this.scene.backgroundZone.setInteractive();
      this.setVisible(false);
    });

    this.add(this.closeImage);

    const imageElement = this.closeImage.node as HTMLImageElement;
    imageElement.src = `${process.env.PUBLIC_URL}/assets/menu/menuScene/closeButton.png`;
  }

  addBackground() {
    this.background = this.scene.add
      .dom(0, 0, "div", "width : 100vw; height:100vh; background-color: black;")
      .setAlpha(0.8)
      .setOrigin(0);

    this.add(this.background);
  }
}
