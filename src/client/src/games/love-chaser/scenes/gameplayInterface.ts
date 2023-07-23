import { calculatePercentage } from "../../tbilisi-batumi-1/helper/tatukaMath";
import { GamePlay } from "./gamePlay";
import { MenuButton } from "../components/buttons/menuButton";
import { GameData } from "../core/gameData";
import { GamePlayButton } from "../components/buttons/gamePlayButton";
import { Player } from "../characters/player";
import { screenSize } from "../config/layoutConfig";

export class GamePlayInterface extends Phaser.Scene {
  gameStartText!: Phaser.GameObjects.Text;

  gameStartModal!: Phaser.GameObjects.Container;
  gameIndicators!: Phaser.GameObjects.Container;

  ownerText!: Phaser.GameObjects.Text;
  guestText!: Phaser.GameObjects.Text;
  timerText!: Phaser.GameObjects.Text;

  shadowImage!: Phaser.GameObjects.Image;

  openDoorButton!: GamePlayButton;
  closeDoorButton!: GamePlayButton;

  gamePlayScene!: GamePlay;

  heart_1!: Phaser.GameObjects.Image;
  heart_2!: Phaser.GameObjects.Image;
  heart_3!: Phaser.GameObjects.Image;

  finishModal!: Phaser.GameObjects.Container;
  finishTitle!: Phaser.GameObjects.Text;
  finishText!: Phaser.GameObjects.Text;

  clickSound!: Phaser.Sound.BaseSound;

  canPressEnter = false;

  constructor() {
    super("GamePlayInterface");
  }

  create() {
    this.gamePlayScene = this.scene.get("GamePlay") as GamePlay;
    this.addShadowImage();

    this.createGameStartModal();
    this.createGameIndicators();
    this.createTimerText();

    this.createDoorButtons();

    this.addGuestHeart();
    this.createFinishModal();
    this.addEnterListener();

    this.clickSound = this.sound.add("clickSound", {
      volume: 0.2,
    });

    this.input.keyboard.on("keydown", (event: any) => {
      if (
        event.key === "Enter" ||
        event.code === "Enter" ||
        event.keyCode === 13
      ) {
        if (this.canPressEnter === false) return;

        if (this.gamePlayScene.currentDoor.isOpen) {
          this.clickSound.play();
          this.gamePlayScene.currentDoor.close();
          this.closeDoorButton.setVisible(false);
        } else {
          this.clickSound.play();
          this.gamePlayScene.currentDoor.open();
          this.openDoorButton.setVisible(false);
        }
      }
    });

    if (window.innerWidth < 1000) {
      this.addMobileController();
    }
  }

  addMobileController() {
    const topButton = this.add
      .image(0, 0, "arrow")
      .setOrigin(1)
      .setScale(0.6)
      .setRotation(-1.57)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.gamePlayScene.player.direction = "up";
        topButton.setTint(0x1fe817);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.gamePlayScene.player.stopPlayer();
        topButton.setTint(0xffffff);
      });
    topButton.setPosition(
      this.game.canvas.width - topButton.width,
      this.game.canvas.height - topButton.height - 60
    );

    const bottomButton = this.add
      .image(0, 0, "arrow")
      .setOrigin(1)
      .setScale(0.6)
      .setRotation(1.57)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.gamePlayScene.player.direction = "down";
        bottomButton.setTint(0x1fe817);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.gamePlayScene.player.stopPlayer();
        bottomButton.setTint(0xffffff);
      });
    bottomButton.setPosition(
      this.game.canvas.width - topButton.width - 53,
      this.game.canvas.height - bottomButton.height + 60
    );

    const rightButton = this.add
      .image(0, 0, "arrow")
      .setOrigin(1)
      .setScale(0.6)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.gamePlayScene.player.direction = "right";
        rightButton.setTint(0x1fe817);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.gamePlayScene.player.stopPlayer();
        rightButton.setTint(0xffffff);
      });
    rightButton.setPosition(
      this.game.canvas.width - topButton.width + 60,
      this.game.canvas.height - bottomButton.height + 28
    );

    const leftButton = this.add
      .image(0, 0, "arrow")
      .setOrigin(1)
      .setScale(0.6)
      .setFlipX(true)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.gamePlayScene.player.direction = "left";
        leftButton.setTint(0x1fe817);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.gamePlayScene.player.stopPlayer();
        leftButton.setTint(0xffffff);
      });
    leftButton.setPosition(
      this.game.canvas.width - topButton.width - 62,
      this.game.canvas.height - bottomButton.height + 28
    );
  }

  addEnterListener() {
    // Listen for the Enter key press
    this.input.keyboard.on("keydown", (event: any) => {
      if (
        event.key === "Enter" ||
        event.code === "Enter" ||
        event.keyCode === 13
      ) {
        if (this.closeDoorButton.visible) {
          this.clickSound.play();
          this.gamePlayScene.currentDoor.open();
          this.openDoorButton.setVisible(false);
        }
        if (this.openDoorButton.visible) {
          this.clickSound.play();
          this.gamePlayScene.currentDoor.close();
          this.closeDoorButton.setVisible(false);
        }
      }
    });
  }

  createFinishModal() {
    this.finishModal = this.add.container(0, 0).setDepth(500).setVisible(false);

    this.finishTitle = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(20, this.game.canvas.height),
        "",
        {
          align: "center",
          fontSize: screenSize().gamePlay.finishModal.title.fontSize,
          color: "#FFFBFA",
          fontFamily: "Bungee",
          backgroundColor: "#1C1A38",
        }
      )
      .setOrigin(0.5);

    this.finishModal.add(this.finishTitle);

    this.finishText = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(35, this.game.canvas.height),
        "",
        {
          align: "center",
          fontSize: screenSize().gamePlay.finishModal.text.fontSize,
          color: "#FFFBFA",
          fontFamily: "Bungee",
          backgroundColor: "#1C1A38",
        }
      )
      .setOrigin(0.5);

    this.finishModal.add(this.finishText);

    const gamePlayButton = new GamePlayButton(
      this,
      this.game.canvas.width / 2,
      calculatePercentage(65, this.game.canvas.height),
      "Again",
      "#F58953"
    ).on(Phaser.Input.Events.POINTER_DOWN, () => {
      window.location.reload();
    });

    this.finishModal.add(gamePlayButton);
  }

  addGuestHeart() {
    this.heart_1 = this.add
      .image(0, 0, "gameplay-heart")
      .setScale(0.04)
      .setOrigin(1, 0.5)
      .setVisible(false);
    this.heart_1.setPosition(
      this.game.canvas.width -
        this.guestText.displayWidth -
        calculatePercentage(2, this.game.canvas.width),
      calculatePercentage(
        screenSize().gamePlay.heart.y,
        this.game.canvas.height
      )
    );

    this.heart_2 = this.add
      .image(0, 0, "gameplay-heart")
      .setScale(0.04)
      .setOrigin(1, 0.5)
      .setVisible(false);
    this.heart_2.setPosition(
      this.game.canvas.width -
        this.guestText.displayWidth -
        calculatePercentage(2, this.game.canvas.width) -
        this.heart_1.displayWidth,
      calculatePercentage(
        screenSize().gamePlay.heart.y,
        this.game.canvas.height
      )
    );

    this.heart_3 = this.add
      .image(0, 0, "gameplay-heart")
      .setScale(0.04)
      .setOrigin(1, 0.5)
      .setVisible(false);
    this.heart_3.setPosition(
      this.game.canvas.width -
        this.guestText.displayWidth -
        calculatePercentage(2, this.game.canvas.width) -
        this.heart_1.displayWidth * 2,
      calculatePercentage(
        screenSize().gamePlay.heart.y,
        this.game.canvas.height
      )
    );
  }

  createDoorButtons() {
    this.openDoorButton = new GamePlayButton(this, 0, 0, "Open", "#67C732").on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        this.clickSound.play();
        this.gamePlayScene.currentDoor.open();
        this.openDoorButton.setVisible(false);
      }
    );
    this.openDoorButton.setPosition(
      this.game.canvas.width -
        this.openDoorButton.getBounds().width -
        calculatePercentage(
          screenSize().gamePlay.doorButton.x,
          this.game.canvas.width
        ),
      this.game.canvas.height -
        this.openDoorButton.getBounds().height -
        calculatePercentage(2, this.game.canvas.height)
    );

    this.closeDoorButton = new GamePlayButton(
      this,
      0,
      0,
      "Close",
      "#67C732"
    ).on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.clickSound.play();
      this.gamePlayScene.currentDoor.close();
      this.closeDoorButton.setVisible(false);
    });
    this.closeDoorButton.setPosition(
      this.game.canvas.width -
        this.closeDoorButton.getBounds().width -
        calculatePercentage(
          screenSize().gamePlay.doorButton.x,
          this.game.canvas.width
        ),
      this.game.canvas.height -
        this.closeDoorButton.getBounds().height -
        calculatePercentage(2, this.game.canvas.height)
    );

    this.openDoorButton.setVisible(false);
    this.closeDoorButton.setVisible(false);
  }

  createTimerText() {
    this.timerText = this.add
      .text(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 -
          calculatePercentage(5, this.game.canvas.height),
        "10",
        {
          align: "center",
          fontSize: screenSize().gamePlay.startModal.timer.fontSize,
          color: "#DB7851",
          fontFamily: "Bungee",
        }
      )
      .setVisible(false)
      .setOrigin(0.5);
  }

  addShadowImage() {
    this.shadowImage = this.add
      .image(-500, -500, "default-image")
      .setOrigin(0)
      .setTint(0x103240)
      .setAlpha(0.5)
      .setDisplaySize(this.game.canvas.width * 2, this.game.canvas.height * 2)
      .setScale(5);
  }

  createGameIndicators() {
    this.gameIndicators = this.add.container();
    this.gameIndicators.setVisible(false);

    this.ownerText = this.add
      .text(0, 0, "", {
        align: "center",
        fontSize: screenSize().gamePlay.gameIndicators.userText.fontSize,
        color: "#DB7851",
        fontFamily: "Bungee",
        backgroundColor: "black",
      })
      .setOrigin(0, 0.5);

    this.ownerText.setPosition(
      this.ownerText.displayWidth +
        calculatePercentage(2, this.game.canvas.width),
      this.ownerText.displayHeight / 2 +
        calculatePercentage(2, this.game.canvas.height)
    );

    this.gameIndicators.add(this.ownerText);

    this.guestText = this.add
      .text(0, 0, "", {
        align: "right",
        fontSize: screenSize().gamePlay.gameIndicators.userText.fontSize,
        color: "#DB7851",
        fontFamily: "Bungee",
        backgroundColor: "black",
      })
      .setOrigin(1, 0.5);

    this.guestText.setPosition(
      this.game.canvas.width -
        this.guestText.displayWidth -
        calculatePercentage(2, this.game.canvas.width),
      this.guestText.displayHeight / 2 +
        calculatePercentage(2, this.game.canvas.height)
    );

    this.gameIndicators.add(this.guestText);
  }

  createGameStartModal() {
    this.gameStartModal = this.add.container(0, 0);
    this.gameStartModal.setVisible(false);

    const mainText = this.add
      .text(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 -
          calculatePercentage(40, this.game.canvas.height),
        [
          "Share the link with a friend to start the",
          " game or wait for someone else",
        ],
        {
          align: "center",
          fontSize: screenSize().gamePlay.startModal.fontSize,
          color: "#DB7851",
          fontFamily: "Bungee",
        }
      )
      .setDepth(200)
      .setScrollFactor(0, 0)
      .setOrigin(0.5);

    this.gameStartModal.add(mainText);

    const copyText = this.add
      .text(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 -
          calculatePercentage(30, this.game.canvas.height),
        [`${document.URL}`],
        {
          align: "center",
          fontSize: screenSize().gamePlay.startModal.copyText.fontSize,
          color: "#DB7851",
          fontFamily: "Bungee",
        }
      )
      .setDepth(200)
      .setScrollFactor(0, 0)
      .setOrigin(0.5);

    this.gameStartModal.add(copyText);

    const copyButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 -
        calculatePercentage(
          screenSize().gamePlay.startModal.copyButton.y,
          this.game.canvas.height
        ),
      "copy"
    ).on(Phaser.Input.Events.POINTER_DOWN, () => {
      navigator.clipboard.writeText(document.URL);
      copyButton.setVisible(false);
    });
    this.gameStartModal.add(copyButton);
  }
}
