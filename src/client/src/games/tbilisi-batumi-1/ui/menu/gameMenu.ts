import MusicPlayer from "../../musicPlayer";
import { GamePlay } from "../../scenes/gamePlay";
import layoutConfig from "../../config/layoutConfig.json";

import { screenSize } from "../../config/getScreenSize";
import { Bullet } from "../../gameObjects/russialSoldier";
import { clearInterval } from "timers";

export class GameMenu extends Phaser.Scene {
  layer!: Phaser.GameObjects.Layer;
  speedometerContainer!: Phaser.GameObjects.Container;
  menuButtonsContainer!: Phaser.GameObjects.Container;
  gameIndicatorsContainer!: Phaser.GameObjects.Container;

  stopUpdateProcess = false;

  menuButton!: Phaser.GameObjects.Image;
  speedometer!: Phaser.GameObjects.Image;

  speedometerArrow!: Phaser.GameObjects.Image;
  speedometerArrowRotation = -1.5;

  gamePlayScene!: GamePlay;

  continueButtonTween!: Phaser.Tweens.Tween;
  mainMenuTween!: Phaser.Tweens.Tween;
  recordsButtonTween!: Phaser.Tweens.Tween;

  titleText = "";
  regionNameText = "";
  screenTextsContainer!: Phaser.GameObjects.Container;

  radioGreenButtons!: Phaser.GameObjects.Container;
  radioRedButtons!: Phaser.GameObjects.Container;

  radioIsAccess = false;
  moneyIsaccess = false;

  money = 0;
  moneyText!: Phaser.GameObjects.Text;
  moneyContainer!: Phaser.GameObjects.Container;

  screenWidth!: number;
  screenHeight!: number;

  constructor() {
    super("GameMenu");
  }

  create() {
    //Initil Canvas Screen Sizes
    this.screenWidth = this.game.canvas.width;
    this.screenHeight = this.game.canvas.height;

    this.gamePlayScene = this.scene.get("GamePlay") as GamePlay;

    this.menuButtonsContainer = this.add.container(0, 0);
    this.gameIndicatorsContainer = this.add.container(0, 0);

    this.radioGreenButtons = this.add.container(0, 0);
    this.radioRedButtons = this.add.container(0, 0);

    this.speedometerContainer = this.add.container(0, 0);
    this.speedometerContainer.setVisible(false);

    this.moneyContainer = this.add.container(0, 0);
    this.moneyContainer.setVisible(false);

    this.menuButtonsContainer.setVisible(false);

    this.screenTextsContainer = this.add.container(0, 0);

    this.addSpeedometer();
    this.addMoneyIndicator();
    this.addMenuIcon();
    this.addMenuButtons();
    this.creatScreenTexts();

    this.openAccessIndicators();
  }

  openAccessIndicators() {
    if (this.radioIsAccess) {
      this.speedometerContainer.setVisible(true);
    }
    if (this.moneyIsaccess) {
      this.moneyContainer.setVisible(true);
    }
  }

  addMoneyIndicator() {
    const lariIcon = this.add
      .image(10, 10, "lariIcon")
      .setScale(0.12)
      .setAlpha(0.3)
      .setOrigin(0);

    this.moneyText = this.add
      .text(90, 24, this.money.toString(), {
        color: "white",
        fontFamily: "mainFont",
        fontSize: "40px",
      })
      .setDisplaySize(20, 30);

    this.moneyText.setShadow(1, 1, "white", 8);

    this.moneyContainer.add([lariIcon, this.moneyText]);

    this.gameIndicatorsContainer.add(this.moneyContainer);
  }

  increaseMoney(number: number) {
    this.money += number;
    this.moneyText.setText(this.money.toString());
  }

  createRadioButtons() {
    // // Green Buttons
    // const radioLeftGreenButton = this.add
    //   .image(
    //     this.screenWidth / 2 +
    //       screenSize().gameMenu.radioLeftButtons.positions.x,
    //     this.screenHeight + screenSize().gameMenu.radioLeftButtons.positions.y,
    //     "radioGreenButton"
    //   )
    //   .setScale(1.2)
    //   .setInteractive()
    //   .on(Phaser.Input.Events.POINTER_DOWN, () => {
    //     this.gamePlayScene.musicPlayer.changeRadioToUp();
    //   })
    //   .on(Phaser.Input.Events.POINTER_OVER, () => {
    //     radioLeftGreenButton.setScale(1.4);
    //   })
    //   .on(Phaser.Input.Events.POINTER_OUT, () => {
    //     radioLeftGreenButton.setScale(1.2);
    //   });

    // const radioRightGreenButton = this.add
    //   .image(
    //     this.screenWidth / 2 +
    //       screenSize().gameMenu.radioRightButtons.positions.x,
    //     this.screenHeight + screenSize().gameMenu.radioRightButtons.positions.y,
    //     "radioGreenButton"
    //   )
    //   .setScale(1.2)
    //   .setFlipY(true)
    //   .setInteractive()
    //   .on(Phaser.Input.Events.POINTER_OVER, () => {
    //     radioRightGreenButton.setScale(1.4);
    //   })
    //   .on(Phaser.Input.Events.POINTER_OUT, () => {
    //     radioRightGreenButton.setScale(1.2);
    //   });

    // // Red Buttons
    // const radioLeftRedButton = this.add
    //   .image(
    //     this.screenWidth / 2 +
    //       screenSize().gameMenu.radioLeftButtons.positions.x,
    //     this.screenHeight + screenSize().gameMenu.radioLeftButtons.positions.y,
    //     "radioRedButton"
    //   )
    //   .setScale(1.2)
    //   .setInteractive()
    //   .on(Phaser.Input.Events.POINTER_OVER, () => {
    //     radioLeftRedButton.setScale(1.4);
    //   })
    //   .on(Phaser.Input.Events.POINTER_OUT, () => {
    //     radioLeftRedButton.setScale(1.2);
    //   });

    // const radioRightRedButton = this.add
    //   .image(
    //     this.screenWidth / 2 +
    //       screenSize().gameMenu.radioRightButtons.positions.x,
    //     this.screenHeight + screenSize().gameMenu.radioRightButtons.positions.y,
    //     "radioRedButton"
    //   )
    //   .setScale(1.2)
    //   .setFlipY(true)
    //   .setInteractive()
    //   .on(Phaser.Input.Events.POINTER_OVER, () => {
    //     radioRightRedButton.setScale(1.4);
    //   })
    //   .on(Phaser.Input.Events.POINTER_OUT, () => {
    //     radioRightRedButton.setScale(1.2);
    //   });

    // this.radioRedButtons.add([radioLeftRedButton, radioRightRedButton]);
    // this.radioGreenButtons.add([radioLeftGreenButton, radioRightGreenButton]);

    this.speedometerContainer.add(this.radioGreenButtons);
    this.speedometerContainer.add(this.radioRedButtons);

    this.radioOff();
  }

  radioOnn() {
    this.radioGreenButtons.setVisible(true);
    this.radioRedButtons.setVisible(false);
  }

  radioOff() {
    this.radioGreenButtons.setVisible(false);
    this.radioRedButtons.setVisible(true);
  }

  showInformationOnMap(text: Array<string>) {
    const modalContainer = this.add.container(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );

    const modalBackground = this.add
      .image(0, 0, "modal")
      .setOrigin(0.5)
      .setScale(0.7);

    const okButton = this.add
      .image(modalContainer.width / 2, 368, "ok-button")
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.gamePlayScene.buttonSound.play();
        this.hideMenu();
        modalContainer.destroy(true);
      })
      .setScale(0.3)
      .setTint(0xffd4ca);

    okButton.on(Phaser.Input.Events.POINTER_OVER, () => {
      okButton.setScale(0.32);
    });
    okButton.on(Phaser.Input.Events.POINTER_OUT, () => {
      okButton.setScale(0.3);
    });

    const txt = this.add
      .text(modalContainer.width / 2, modalContainer.height / 2, text, {
        fontFamily: "mainFont",
        color: "black",
        align: "center",
        fontSize: "17px",
      })
      .setOrigin(0.5);
    txt.setLineSpacing(10);

    this.gameIndicatorsContainer.setVisible(false);
    this.gamePlayScene.pauseScene();

    //Modal Open Animation
    modalContainer.add([modalBackground, okButton, txt]);
    modalContainer.setScale(0);

    this.add.tween({
      targets: modalContainer,
      duration: 800,
      scale: 1,
      ease: Phaser.Math.Easing.Bounce.Out,
    });
  }

  showGovermentInformationOnMap(
    iconKey: string,
    text: string[],
    price: number
  ) {
    const modalContainer = this.add.container(0, 0);

    if (price === 0) {
      const icon = this.add
        .image(this.game.canvas.width / 2, 200, iconKey)
        .setScale(0.8)
        .setDepth(-1);

      const modalBackground = this.add
        .image(this.game.canvas.width / 2, 349, "white")
        .setDisplaySize(400, 40)
        .setOrigin(0.5)
        .setTint(0x192e19);

      const modalText = this.add
        .text(this.game.canvas.width / 2, 400, text, {
          fontSize: "27px",
          color: "#D8FFBD",
          backgroundColor: "#11140F",
          align: "center",
        })
        .setPadding(20)
        .setOrigin(0.5, 0);

      const okButton = this.add
        .image(this.game.canvas.width / 2, 598, "ok-button")
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
          this.gamePlayScene.buttonSound.play();
          this.hideMenu();
          modalContainer.destroy(true);
        })
        .setScale(0.2)
        .setTint(0x93ad80);

      okButton.on(Phaser.Input.Events.POINTER_OVER, () => {
        okButton.setScale(0.23);
      });
      okButton.on(Phaser.Input.Events.POINTER_OUT, () => {
        okButton.setScale(0.2);
      });

      modalContainer.add([icon, modalBackground, modalText, okButton]);
    } else {
    }
  }

  creatScreenTexts() {
    const title = this.add
      .text(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 - 200,
        this.titleText,
        {
          color: "#4BF8FA",
          fontSize: "120px",
          backgroundColor: "#082118",
        }
      )
      .setOrigin(0.5);
    const text = this.add
      .text(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 - 300,
        this.regionNameText,
        {
          color: "#4BF8FA",
          fontSize: "62px",
          backgroundColor: "#082118",
        }
      )
      .setText("")
      .setOrigin(0.5);

    this.screenTextsContainer.add([title, text]);
    this.screenTextsContainer.setAlpha(0);
  }

  showScreenTexts(title: string, text: string) {
    //@ts-ignore
    this.screenTextsContainer.getAt(0).setText(title);
    //@ts-ignore
    this.screenTextsContainer.getAt(1).setText(text);

    this.tweens.add({
      targets: this.screenTextsContainer,
      duration: 4000,
      alpha: 1,
      onComplete: () => {
        setTimeout(() => {
          this.hideScreenTexts();
        }, 1500);
      },
    });
  }

  hideScreenTexts() {
    this.tweens.add({
      targets: this.screenTextsContainer,
      duration: 5000,
      alpha: 0,
    });
  }

  addMenuIcon() {
    this.menuButton = this.add
      .image(
        this.screenWidth + screenSize().gameMenu.menuIcon.positions.x,
        screenSize().gameMenu.menuIcon.positions.y,
        "gamePlayMenuIcon"
      )
      .setScale(screenSize().gameMenu.menuIcon.scale)
      .setAlpha(0.5)
      .setInteractive();

    //Add Events
    this.menuButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.gamePlayScene.buttonSound.play();
      this.showMenu();
    });

    this.menuButton.on(Phaser.Input.Events.POINTER_OVER, () => {
      this.menuButton.setAlpha(1);
    });
    this.menuButton.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.menuButton.setAlpha(0.5);
    });
  }

  showMenu() {
    this.menuButton.setVisible(false);
    //@ts-ignore
    this.gamePlayScene.pauseScene();

    this.gameIndicatorsContainer.setVisible(false);
    this.menuButtonsContainer.setVisible(true);

    this.continueButtonTween.restart();
    // this.mainMenuTween.restart();
    // this.recordsButtonTween.restart();
  }

  hideMenu() {
    this.menuButton.setVisible(true);

    this.gamePlayScene.continueScene();

    this.menuButtonsContainer.setVisible(false);
    this.openAccessIndicators();
    this.gameIndicatorsContainer.setVisible(true);
  }

  addMenuButtons() {
    const continueButton = this.add
      .image(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "gameplayMenuContinueButton"
      )
      .setScale(0)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.hideMenu();
        this.gamePlayScene.buttonSound.play();
      })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        continueButton.setScale(0.55);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        continueButton.setScale(0.5);
      });

    this.continueButtonTween = this.add.tween({
      targets: continueButton,
      duration: 200,
      scale: 0.5,
      delay: 0,
      ease: Phaser.Math.Easing.Bounce.Out,
    });

    // const mainMenu = this.add
    //   .image(this.game.canvas.width / 2, 450, "gameplayBackToMainMenuButton")
    //   .setScale(0)
    //   .setInteractive()
    //   .on(Phaser.Input.Events.POINTER_OVER, () => {
    //     mainMenu.setScale(0.55);
    //   })
    //   .on(Phaser.Input.Events.POINTER_OUT, () => {
    //     mainMenu.setScale(0.5);
    //   })
    //   .on(Phaser.Input.Events.POINTER_DOWN, () => {
    //     this.gamePlayScene.scene.restart();
    //   });

    // this.mainMenuTween = this.add.tween({
    //   targets: mainMenu,
    //   duration: 200,
    //   scale: 0.5,
    //   delay: 150,
    //   ease: Phaser.Math.Easing.Bounce.Out,
    // });

    // const recordsButton = this.add
    //   .image(this.game.canvas.width / 2, 200, "gameplayRecordsIcon")
    //   .setScale(0)
    //   .setInteractive()
    //   .on(Phaser.Input.Events.POINTER_OVER, () => {
    //     recordsButton.setScale(0.55);
    //   })
    //   .on(Phaser.Input.Events.POINTER_OUT, () => {
    //     recordsButton.setScale(0.5);
    //   });

    // this.recordsButtonTween = this.add.tween({
    //   targets: recordsButton,
    //   duration: 200,
    //   scale: 0.5,
    //   ease: Phaser.Math.Easing.Bounce.Out,
    // });

    this.menuButtonsContainer.add([continueButton]);
  }

  addSpeedometer() {
    this.speedometer = this.add
      .image(
        this.game.canvas.width / 2,
        this.screenHeight + screenSize().gameMenu.speedometer.positions.y,
        "speedometer"
      )
      .setScale(0.4);

    this.speedometerContainer.add(this.speedometer);

    this.speedometerArrow = this.add
      .image(
        this.game.canvas.width / 2 + 11,
        this.screenHeight + screenSize().gameMenu.speedometerArrow.positions.y,
        "speedometer-arrow"
      )
      .setScale(0.3)
      .setOrigin(0.5, 0.99)
      .setRotation(-1.5);

    this.speedometerContainer.add(this.speedometerArrow);
    this.createRadioButtons();
    this.gameIndicatorsContainer.add(this.speedometerContainer);
  }

  update() {
    if (this.stopUpdateProcess === false) {
      this.speedometerArrowRotation =
        (Math.abs(this.gamePlayScene.car.carBody.body.velocity.x) / 9) * 1.5;
      this.speedometerArrow.setRotation(this.speedometerArrowRotation - 1.5);
    }
  }
}
