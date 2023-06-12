import { calculatePercentage } from "../helper/tatukaMath";
import config from "../config/layoutConfig.json";
import { Responsivedata } from "../config/interfaces";

import { screenSize } from "../config/getScreenSize";
import { MenuMap } from "../components/menuMap";
import { MenuInfo } from "../components/menuInfo";

export class Menu extends Phaser.Scene {
  backgroundZone!: Phaser.GameObjects.Image;
  touchToScreenText!: Phaser.GameObjects.Text;
  touchScreenTextTween!: Phaser.Tweens.Tween;
  plug!: Phaser.GameObjects.Image;
  configData: Responsivedata = config;

  isMenuOff = true;

  plugSound!: Phaser.Sound.BaseSound;
  buttonSound!: Phaser.Sound.BaseSound;

  menuButtonsContainer!: Phaser.GameObjects.Container;
  menuMap!: MenuMap;
  menuInfo!: MenuInfo;

  constructor() {
    super("Menu");
  }

  create() {
    this.addBackground();
    this.addCar();
    this.addPlug();
    this.addInteractiveZone();
    this.addTouchToScreenText();
    this.createMenuButtons();
    this.createMenuMap();
    this.createMenuInfo();

    //Load Sound Effects
    this.plugSound = this.sound.add("plugSound", {
      volume: 1,
    });
    this.buttonSound = this.sound.add("buttonSound", {
      volume: 1,
    });
  }

  createMenuMap() {
    this.menuMap = new MenuMap(this);
  }

  createMenuInfo() {
    this.menuInfo = new MenuInfo(this);
  }

  createMenuButtons() {
    this.menuButtonsContainer = this.add
      .container(this.game.canvas.width / 2, this.game.canvas.height / 2)
      .setDepth(100);

    const playButton = this.add
      .image(
        screenSize().menu.playButton.positions.x,
        screenSize().menu.playButton.positions.y,
        "menuButton"
      )
      .setOrigin(0.5)
      .setScale(screenSize().menu.playButton.scale)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        playButton.setTint(0x143bfc);
        playText.setScale(1.2);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        playButton.setTint(0xffffff);
        playText.setScale(1);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.buttonSound.play();
        this.playGame();
      });

    const playText = this.add
      .text(
        screenSize().menu.playButton.positions.x,
        screenSize().menu.playButton.positions.y,
        "Play",
        {
          fontFamily: "mainFont",
          color: "#FFF5D7",
          fontSize: `${screenSize().menu.playText.fontSize}px`,
          align: "center",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setShadow(3, 3, "#D4930D")
      .setPadding(screenSize().menu.playText.padding);

    const mapButton = this.add
      .image(
        screenSize().menu.mapButton.positions.x,
        screenSize().menu.mapButton.positions.y,
        "menuButton"
      )
      .setOrigin(0.5)
      .setScale(screenSize().menu.mapButton.scale)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        mapButton.setTint(0x143bfc);
        mapText.setScale(1.2);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        mapButton.setTint(0xffffff);
        mapText.setScale(1);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.buttonSound.play();
        this.menuButtonsContainer.setVisible(false);
        this.backgroundZone.removeInteractive();
        this.menuMap.setVisible(true);
      });

    const mapText = this.add
      .text(
        screenSize().menu.mapButton.positions.x,
        screenSize().menu.mapButton.positions.y,
        "Load",
        {
          fontFamily: "mainFont",
          color: "#FFF5D7",
          fontSize: `${screenSize().menu.mapText.fontSize}px`,
          align: "center",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setShadow(3, 3, "#D4930D")
      .setPadding(screenSize().menu.mapText.padding);

    const informationButton = this.add
      .image(
        screenSize().menu.informationButton.positions.x,
        screenSize().menu.informationButton.positions.y,
        "menuButton"
      )
      .setOrigin(0.5)
      .setScale(screenSize().menu.informationButton.scale)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        informationButton.setTint(0x143bfc);
        informationText.setScale(1.2);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        informationButton.setTint(0xffffff);
        informationText.setScale(1);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.buttonSound.play();
        this.menuButtonsContainer.setVisible(false);
        this.backgroundZone.removeInteractive();
        this.menuInfo.setVisible(true);
      });

    const informationText = this.add
      .text(
        screenSize().menu.informationButton.positions.x,
        screenSize().menu.informationButton.positions.y,
        "Info",
        {
          fontFamily: "mainFont",
          color: "#FFF5D7",
          fontSize: `${screenSize().menu.informationText.fontSize}px`,
          align: "center",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setShadow(3, 3, "#D4930D")
      .setPadding(screenSize().menu.informationText.padding);

    this.menuButtonsContainer.add([
      playButton,
      playText,
      mapButton,
      mapText,
      informationButton,
      informationText,
    ]);

    this.menuButtonsContainer.setScale(0);
  }

  addTouchToScreenText() {
    this.touchToScreenText = this.add
      .text(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        screenSize().menu.touchScreenText.text,
        {
          align: "center",
          fontFamily: "mainFont",
          fontSize: `${screenSize().menu.touchScreenText.fontSize}px`,
        }
      )
      .setAlpha(0)
      .setOrigin(0.5);

    //Add Animation
    this.touchScreenTextTween = this.tweens.add({
      targets: this.touchToScreenText,
      duration: 500,
      alpha: 1,
      yoyo: true,
      repeat: -1,
    });
  }

  addBackground() {
    this.add
      .image(0, 0, "menuBackground")
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height)
      .setOrigin(0);
  }

  addCar() {
    this.add.image(812, 603, "menuCarBody").setScale(2);
    //left Tire
    this.add.image(570, 730, "menuCarTire").setScale(1.4);
    //right Tire
    this.add.image(1076, 730, "menuCarTire").setScale(1.4);
  }

  addPlug() {
    this.plug = this.add
      .image(this.game.canvas.width - 108, 300, "plug")
      .setDisplaySize(
        calculatePercentage(4, this.game.canvas.width),
        calculatePercentage(2, this.game.canvas.height)
      );
  }

  addInteractiveZone() {
    this.backgroundZone = this.add
      .image(0, 0, "white")
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height)
      .setOrigin(0)
      .setAlpha(0.9)
      .setTint(0x141314)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.plugSound.play();
        if (this.isMenuOff) {
          this.isMenuOff = false;
          this.openMenu();
          return;
        } else {
          this.isMenuOff = true;
          this.closeMenu();
        }
      });
  }

  openMenu() {
    this.touchToScreenText.setVisible(false);
    this.backgroundZone.setAlpha(0.4);

    //Up Plug Animation
    this.tweens.add({
      targets: this.plug,
      duration: 150,
      y: 230,
    });

    //showMenuButtons
    this.tweens.add({
      targets: this.menuButtonsContainer,
      duration: 150,
      scale: 1,
    });
  }

  closeMenu() {
    this.touchToScreenText.setVisible(true);
    this.backgroundZone.setAlpha(0.9);
    this.touchScreenTextTween.restart();

    //down Plug Animation
    this.tweens.add({
      targets: this.plug,
      duration: 150,
      y: 300,
    });

    //hideMenuButtons
    this.tweens.add({
      targets: this.menuButtonsContainer,
      duration: 150,
      scale: 0,
    });
  }

  playGame() {
    this.scene.start("GamePlay");
  }
}
