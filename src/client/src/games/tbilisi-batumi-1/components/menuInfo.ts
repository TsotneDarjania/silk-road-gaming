import { screenSize } from "../config/getScreenSize";
import { calculatePercentage } from "../helper/tatukaMath";
import { Menu } from "../scenes/menu";

export class MenuInfo extends Phaser.GameObjects.Container {
  closeButton!: Phaser.GameObjects.Image;

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
    const text = this.scene.add
      .text(
        this.scene.game.canvas.width / 2,
        this.scene.game.canvas.height / 2,
        [
          "Welcome to an extraordinary adventure!",
          " Embark on a surreal journey in this",
          " unique game where you take the wheel ",
          " of a car and traverse the distance ",
          " from the vibrant city of Tbilisi to the enchanting Batumi. ",
          " Prepare yourself to encounter a myriad of obstacles along the way. ",
          " Dear players, please keep in mind that this version serves as a demo project ",
          " offering a glimpse into the vast potential of a magnificent ",
          " game that awaits in the future.",
          " We are dedicated to crafting an immersive travel",
          " experience of remarkable proportions",
          " Best of all, this game is completely free!",
          " Enjoy the ride and have an amazing gaming experience!",
        ],
        {
          align: "center",
          fontSize: screenSize().menu.menuInfoTextSize,
        }
      )
      .setOrigin(0.5);

    this.add(text);
  }

  addCloseImage() {
    this.closeButton = this.scene.add
      .image(20, 20, "closeButton")
      .setDisplaySize(
        calculatePercentage(
          screenSize().gameMenu.closeButton.widthPercent,
          this.scene.game.canvas.width
        ),
        calculatePercentage(
          screenSize().gameMenu.closeButton.widthPercent,
          this.scene.game.canvas.width
        )
      )
      .setOrigin(0)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.buttonSound.play();
        this.scene.menuButtonsContainer.setVisible(true);
        this.scene.backgroundZone.setInteractive();
        this.setVisible(false);
      });
    this.add(this.closeButton);
  }

  addBackground() {
    const background = this.scene.add
      .image(0, 0, "white")
      .setDisplaySize(
        this.scene.game.canvas.width,
        this.scene.game.canvas.height
      )
      .setOrigin(0)
      .setTint(0x010912);

    this.add(background);
  }
}
