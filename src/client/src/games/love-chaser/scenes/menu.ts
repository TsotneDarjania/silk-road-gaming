import { calculatePercentage } from "../../tbilisi-batumi-1/helper/tatukaMath";
import { AppWrite } from "../services/appwrite";

import { CharacterOptions } from "../components/modals/characterOptions";
import { MenuButton } from "../components/buttons/menuButton";
import { RoomList } from "../components/modals/roomList";
import { Lobby } from "../core/lobby";
import { ApiEnums } from "../../../enums/apiEnums";
import { generateIdToCorrectFormat } from "../../../helper/helperFunctions";
import { transliterate } from "transliteration";
import { GameData } from "../core/gameData";
import { screenSize } from "../config/layoutConfig";

export class Menu extends Phaser.Scene {
  characterOptionModal!: CharacterOptions;
  menuButtonsContainer!: Phaser.GameObjects.Container;
  roomList!: RoomList;

  backButton!: Phaser.GameObjects.Image;

  appWrite!: AppWrite;

  lobby!: Lobby;

  clickSound!: Phaser.Sound.BaseSound;

  constructor() {
    super("Menu");
  }

  create() {
    this.characterOptionModal = new CharacterOptions(this, 0, 0);
    this.menuButtonsContainer = this.add.container(0, 0);
    this.roomList = new RoomList(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );

    this.lobby = new Lobby(this);
    this.lobby.getOnlineRooms();

    //Check if this user already has a room created, if yes delete it
    this.checkUserRoom();

    this.addMenuBackgroundImage();
    this.createMenuButtons();
    this.createBackButton();

    this.clickSound = this.sound.add("clickSound", {
      volume: 0.2,
    });
  }

  checkUserRoom() {
    this.lobby.appwrite
      .databases()
      .getDocument(
        ApiEnums.silkRoadDatabaseID,
        "LoveChaserRooms",
        generateIdToCorrectFormat(transliterate(GameData.username))
      )
      .then(
        (response) => {
          this.lobby
            .deleteRoom(
              generateIdToCorrectFormat(transliterate(GameData.username))
            )
            .then((response) => {
              this.roomList.clearRoomList();
              this.lobby.getOnlineRooms();
            });
        },
        (error) => {}
      );
  }

  addMenuBackgroundImage() {
    this.add
      .image(0, 0, "default-image")
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height)
      .setOrigin(0)
      .setDepth(-5)
      .setTint(0x081e2b);
  }

  createBackButton() {
    this.backButton = this.add
      .image(
        calculatePercentage(1, this.game.canvas.width),
        calculatePercentage(1, this.game.canvas.width),
        "back-button"
      )
      .setOrigin(0)
      .setDisplaySize(
        screenSize().backButton.width,
        screenSize().backButton.height
      )
      .setTint(0xcdbeb4)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.backButton.setTint(0xf0ecf2);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.backButton.setTint(0xcdbeb4);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.menuButtonsContainer.setVisible(true);
        this.characterOptionModal.setVisible(false);
        this.roomList.setVisible(false);
        this.backButton.setVisible(false);

        this.clickSound.play();
      })
      .setVisible(false);
  }

  createMenuButtons() {
    const createButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 -
        calculatePercentage(
          screenSize().creaeteButton.y,
          this.game.canvas.height
        ),
      "Create Room"
    ).on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.backButton.setVisible(true);
      this.menuButtonsContainer.setVisible(false);
      this.characterOptionModal.open();

      this.clickSound.play();
    });

    const joinButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 +
        calculatePercentage(screenSize().joinButton.y, this.game.canvas.height),
      "Join Room"
    ).on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.backButton.setVisible(true);
      this.menuButtonsContainer.setVisible(false);
      this.roomList.setVisible(true);

      this.clickSound.play();
    });

    this.menuButtonsContainer.add([createButton, joinButton]);
  }
}
