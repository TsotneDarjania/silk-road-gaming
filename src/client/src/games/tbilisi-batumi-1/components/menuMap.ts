import { gameConfig } from "../config/gameConfig";
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
    let posY = 200;

    for (let i = 0; i < 10; i++) {
      const loadItem = new LoadItem(this.scene, posX, posY, i + 1);
      this.loadItemsContainer.add(loadItem);

      if (i + 1 <= gameConfig.saveZoneIndex) {
        loadItem.makeActive();
      }

      posX += 200;
      if (i === 4) {
        posX = 0;
        posY += 300;
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
  blockIcon!: Phaser.GameObjects.Image;
  text!: Phaser.GameObjects.Text;
  backgroundImage!: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, public value: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setAlpha(0.6);
    this.setScale(1.7);

    this.addBackground();
    this.addText();
    this.addBlockIcon();
  }

  makeActive() {
    this.backgroundImage.setTint(0xd6f0ff);
    this.backgroundImage.setInteractive({ cursor: "pointer" });
    this.blockIcon.setVisible(false);
    this.text.setVisible(true);
    this.setAlpha(1);
  }

  addBlockIcon() {
    this.blockIcon = this.scene.add
      .image(
        this.backgroundImage.displayWidth / 2,
        this.backgroundImage.displayHeight / 2,
        "blockIcon"
      )
      .setScale(0.7);
    this.add(this.blockIcon);
  }

  addBackground() {
    this.backgroundImage = this.scene.add
      .image(0, 0, "loadIcon")
      .setTint(0x5b5a61)
      .setOrigin(0)
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        gameConfig.saveZoneIndex = this.value;
        const scene = this.scene as Menu;
        scene.playGame();
      });

    this.add(this.backgroundImage);
  }

  addText() {
    this.text = this.scene.add
      .text(
        this.backgroundImage.displayWidth / 2,
        this.backgroundImage.displayHeight / 2 + 7,
        this.value.toString(),
        {
          align: "center",
          color: "#010912",
          fontFamily: "mainFont",
          fontSize: "22px",
        }
      )
      .setOrigin(0.5)
      .setVisible(false);

    this.add(this.text);
  }
}
