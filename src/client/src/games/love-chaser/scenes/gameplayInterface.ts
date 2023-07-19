import { calculatePercentage } from "../../tbilisi-batumi-1/helper/tatukaMath";
import { GamePlay } from "./gamePlay";
import { MenuButton } from "../components/buttons/menuButton";
import { GameData } from "../core/gameData";
import { GamePlayButton } from "../components/buttons/gamePlayButton";

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

    this.clickSound = this.sound.add("clickSound", {
      volume: 0.2,
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
          fontSize: "70px",
          color: "#FFFBFA",
          fontFamily: "Bungee",
          backgroundColor: "#1C1A38",
        }
      )
      .setOrigin(0.5);

    this.finishText = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(35, this.game.canvas.height),
        "",
        {
          align: "center",
          fontSize: "40px",
          color: "#FFFBFA",
          fontFamily: "Bungee",
          backgroundColor: "#1C1A38",
        }
      )
      .setOrigin(0.5);
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
      calculatePercentage(10, this.game.canvas.height)
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
      calculatePercentage(10, this.game.canvas.height)
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
      calculatePercentage(10, this.game.canvas.height)
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
        calculatePercentage(2, this.game.canvas.width),
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
        calculatePercentage(2, this.game.canvas.width),
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
          fontSize: "100px",
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
      .setDisplaySize(this.game.canvas.width * 2, this.game.canvas.height * 2);
  }

  createGameIndicators() {
    this.gameIndicators = this.add.container();
    this.gameIndicators.setVisible(false);

    this.ownerText = this.add
      .text(0, 0, "", {
        align: "center",
        fontSize: "30px",
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
        fontSize: "30px",
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
          fontSize: "35px",
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
          fontSize: "30px",
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
        calculatePercentage(20, this.game.canvas.height),
      "copy"
    ).on(Phaser.Input.Events.POINTER_DOWN, () => {
      navigator.clipboard.writeText(document.URL);
      copyButton.setVisible(false);
    });
    this.gameStartModal.add(copyButton);
  }
}
