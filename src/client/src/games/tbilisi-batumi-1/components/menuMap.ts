import { gameConfig } from "../config/gameConfig";
import { screenSize } from "../config/getScreenSize";
import { calculatePercentage } from "../helper/tatukaMath";
import { Menu } from "../scenes/menu";

export class MenuMap extends Phaser.GameObjects.Container {
  closeButton!: Phaser.GameObjects.Image;

  loadItemsContainer!: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.loadItemsContainer = this.scene.add.container(0, 0);

    this.setVisible(false);

    this.addBackground();
    this.addCloseButton();
    this.addSaveZones();
  }

  addSaveZones() {
    let posX = 0;
    let posY =
      this.scene.game.canvas.height / 2 -
      calculatePercentage(30, this.scene.game.canvas.height);

    for (let i = 0; i < 10; i++) {
      const loadItem = new LoadItem(this.scene, posX, posY, i + 1);
      this.loadItemsContainer.add(loadItem);

      if (i + 1 <= gameConfig.saveZoneIndex) {
        loadItem.makeActive();
      }

      posX += calculatePercentage(17, this.scene.game.canvas.width);
      if (i === 4) {
        posX = 0;
        posY += calculatePercentage(40, this.scene.game.canvas.height);
      }
    }

    this.add(this.loadItemsContainer);
    this.loadItemsContainer.setPosition(
      this.scene.game.canvas.width / 2 -
        this.loadItemsContainer.getBounds().width / 2,
      0
    );
  }

  addCloseButton() {
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
        const scene = this.scene as Menu;
        scene.buttonSound.play();
        scene.menuButtonsContainer.setVisible(true);
        scene.backgroundZone.setInteractive();
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

class LoadItem extends Phaser.GameObjects.Container {
  backgroundImage!: Phaser.GameObjects.Image;
  openBackgroundImage!: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, public value: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setScale(screenSize().gameMenu.loadItem.scale);
    this.addBackground();
  }

  makeActive() {
    // this.backgroundImage.setInteractive({ cursor: "pointer" });
    this.backgroundImage.setVisible(false);

    this.openBackgroundImage = this.scene.add
      .image(0, 0, "openLoadItem_" + this.value)
      .setOrigin(0)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        gameConfig.saveZoneIndex = this.value;
        const scene = this.scene as Menu;
        scene.playGame();
      });

    this.add(this.openBackgroundImage);
  }

  addBackground() {
    this.backgroundImage = this.scene.add
      .image(0, 0, "blockLoadItem")
      .setOrigin(0)
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        gameConfig.saveZoneIndex = this.value;
        const scene = this.scene as Menu;
        scene.playGame();
      });

    this.add(this.backgroundImage);
  }
}
