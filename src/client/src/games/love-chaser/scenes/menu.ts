import { response } from "express";
import { calculatePercentage } from "../../tbilisi-batumi-1/helper/tatukaMath";
import { AppWrite } from "../utils/appwrite";
import { GameData } from "../utils/gameData";
import { getCookie } from "../../../helper/cookie";
import { generateIdToCorrectFormat } from "../../../helper/helperFunctions";
import { transliterate } from "transliteration";
import { error } from "console";

export class Menu extends Phaser.Scene {
  characterOptionModal!: Phaser.GameObjects.Container;
  roomsListModal!: Phaser.GameObjects.DOMElement;
  roomsListModalContainer!: Phaser.GameObjects.Container;

  menuButtonsContainer!: Phaser.GameObjects.Container;

  roompPositionX = 0;
  roompPositiony = 0;
  isRoomBackgroundDark = false;

  appWrite!: AppWrite;

  constructor() {
    super("Menu");
  }

  create() {
    this.appWrite = new AppWrite(this);

    this.characterOptionModal = this.add.container(0, 0);
    this.characterOptionModal.setVisible(false);

    this.roomsListModalContainer = this.add.container(0, 0);
    this.roomsListModalContainer.setVisible(false);

    this.menuButtonsContainer = this.add.container(0, 0);
    this.menuButtonsContainer.setVisible(false);

    this.add
      .image(0, 0, "default-image")
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height)
      .setOrigin(0)
      .setDepth(-5)
      .setTint(0x081e2b);

    this.createCharacterOptionModal();
    this.showCharactersOptionModal();
    this.createRoomButtons();

    this.createRoomsListModal();

    this.getOnlineRooms();

    this.appWrite.addNewRoomEventListener(this.scene.key);
  }

  newRoomEvent() {
    if (this.roomsListModal.node === null) return;

    while (this.roomsListModal.node.firstChild) {
      this.roomsListModal.node.removeChild(this.roomsListModal.node.firstChild);
    }

    this.getOnlineRooms();
  }

  getOnlineRooms() {
    this.roompPositionX = 0;
    this.roompPositiony = 0;

    if (this.roomsListModal.node === null) return;

    while (this.roomsListModal.node.firstChild) {
      this.roomsListModal.node.removeChild(this.roomsListModal.node.firstChild);
    }

    this.appWrite.getOnlineRooms().then(
      (response) => {
        response.documents.map((room) => {
          if (this.roomsListModal.node === null) return;
          this.addNewRoom(room.owner, room.ownerCharacter, room.$id);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createRoomsListModal() {
    const title = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(15, this.game.canvas.height),
        "Online Rooms",
        {
          align: "center",
          fontSize: "23px",
          color: "#65D7FF",
          fontFamily: "Bungee",
        }
      )
      .setOrigin(0.5);

    this.roomsListModal = this.add.dom(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "div",
      "width : 32vw; height:60vh; border: 2px solid #65D7FF; overflow-y:scroll;"
    );

    this.roomsListModalContainer.add([title, this.roomsListModal]);
  }

  addNewRoom(owner: string, charachter: string, roomId: string) {
    let roomBackgroundColor;

    if (this.isRoomBackgroundDark) {
      roomBackgroundColor = "#CCC8B3";
    } else {
      roomBackgroundColor = "#DDE1D2";
    }

    const room = this.add
      .dom(
        this.roompPositionX,
        this.roompPositiony,
        "div",
        `width : 100%; height : 8vh; background-color:${roomBackgroundColor};`
      )
      .setOrigin(0);

    const ownerText = this.add
      .dom(
        calculatePercentage(7.4, room.width),
        calculatePercentage(45, room.height),
        "p",
        "color:#2B2736; font-size:30px; text-align:center;"
      )
      .setOrigin(0, 0.5)
      .setText(owner);

    room.node.appendChild(ownerText.node);

    const characterImage = this.add.dom(
      calculatePercentage(5, room.width),
      calculatePercentage(50, room.height),
      "img",
      "width : 90px; height : 90px"
    );
    const imageElement = characterImage.node as HTMLImageElement;
    imageElement.src = `${process.env.PUBLIC_URL}/assets/games/love-chaser/images/${charachter}-default.png`;

    room.node.appendChild(characterImage.node);

    const joinButton = this.add
      .dom(
        calculatePercentage(25.5, room.width),
        calculatePercentage(40, room.height),
        "button",
        "background-color:#314859; border: 4px solid #577F9E; cursor:pointer; width: 160px; height:40px; color:white; font-size:24px;",
        "join"
      )
      .setInteractive()
      .setOrigin(0.5);

    joinButton.node.addEventListener("click", () => {
      this.joinGame(roomId);
    });

    room.node.appendChild(joinButton.node);

    this.roomsListModal.node.appendChild(room.node);

    this.roompPositiony += 77;

    if (this.isRoomBackgroundDark) {
      this.isRoomBackgroundDark = false;
      return;
    } else {
      this.isRoomBackgroundDark = true;
    }
  }

  openRoomsList() {
    this.roomsListModalContainer.setVisible(true);
    this.hideMenuButtons();
  }

  startRoom() {
    const appwirte = new AppWrite(this);
    GameData.roomID = generateIdToCorrectFormat(
      transliterate(GameData.username)
    );

    appwirte.initOwnerPlayer().then(
      (response) => {
        GameData.owner = JSON.parse(getCookie("loginSession")).userName;
        this.scene.start("GamePlay");
      },
      (error) => {
        console.log(error);
        if (error.code === 409) {
          GameData.owner = JSON.parse(getCookie("loginSession")).userName;
          this.scene.start("GamePlay");
        }
      }
    );
  }

  joinGame(roomid: string) {
    GameData.roomID = roomid;
    this.appWrite
      .joinGuestPlayer(roomid, JSON.parse(getCookie("loginSession")).userName)
      .then(
        (response) => {
          this.scene.start("GamePlay");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  showMenuButtons() {
    this.menuButtonsContainer.setVisible(true);
  }

  hideMenuButtons() {
    this.menuButtonsContainer.setVisible(false);
  }

  createRoomButtons() {
    const createbuttonContainer = this.add.container(0, -50);

    const image = this.add
      .image(this.game.canvas.width / 2, this.game.canvas.height / 2, "button")
      .setDisplaySize(300, 90)
      .setTint(0x081e2b)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        image.setTint(0x175478);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        image.setTint(0x081e2b);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.startRoom();
      });

    const text = this.add
      .text(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "Create Game Room",
        {
          align: "center",
          fontSize: "23px",
          color: "#65D7FF",
          fontFamily: "Bungee",
        }
      )
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        image.setTint(0x175478);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        image.setTint(0x081e2b);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.startRoom();
      });

    createbuttonContainer.add([image, text]);

    const joinbuttonContainer = this.add.container(0, 50);

    const image_2 = this.add
      .image(this.game.canvas.width / 2, this.game.canvas.height / 2, "button")
      .setDisplaySize(300, 90)
      .setTint(0x081e2b)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        image_2.setTint(0x175478);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        image_2.setTint(0x081e2b);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.openRoomsList();
      });

    const text_2 = this.add
      .text(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "join Room",
        {
          align: "center",
          fontSize: "23px",
          color: "#65D7FF",
          fontFamily: "Bungee",
        }
      )
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        image_2.setTint(0x175478);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        image_2.setTint(0x081e2b);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.openRoomsList();
      });

    joinbuttonContainer.add([image_2, text_2]);

    this.menuButtonsContainer.add([createbuttonContainer, joinbuttonContainer]);
  }

  showCharactersOptionModal() {
    this.characterOptionModal.setVisible(true);
    this.tweens.add({
      targets: this.characterOptionModal,
      duration: 1500,
      scale: 1,
      ease: Phaser.Math.Easing.Bounce.Out,
    });
  }

  createCharacterOptionModal() {
    const title = this.add
      .text(0, 0, "Select Your Character", {
        align: "center",
        fontSize: "23px",
        color: "#65D7FF",
        fontFamily: "Bungee",
      })
      .setOrigin(0.5);

    const boyCharacter = this.add
      .image(0, 0, "boy-default")
      .setInteractive({
        cursor: "pointer",
      })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        boyCharacter.setScale(1.2);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        boyCharacter.setScale(1);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        GameData.ownerCharacter = "boy";
        GameData.guestCharacter = "girl";
        this.characterOptionModal.setVisible(false);
        this.showMenuButtons();
      });

    const girlCharacter = this.add
      .image(0, 0, "girl-default")
      .setInteractive({
        cursor: "pointer",
      })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        girlCharacter.setScale(1.2);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        girlCharacter.setScale(1);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        GameData.ownerCharacter = "girl";
        GameData.guestCharacter = "boy";
        this.characterOptionModal.setVisible(false);
        this.showMenuButtons();
      });

    this.characterOptionModal.add([title, boyCharacter, girlCharacter]);

    title.setPosition(
      0,
      -calculatePercentage(50, this.characterOptionModal.getBounds().height)
    );
    boyCharacter.setPosition(
      -calculatePercentage(30, this.characterOptionModal.getBounds().width),
      calculatePercentage(30, this.characterOptionModal.getBounds().height)
    );
    girlCharacter.setPosition(
      calculatePercentage(30, this.characterOptionModal.getBounds().width),
      calculatePercentage(24, this.characterOptionModal.getBounds().height)
    );

    this.characterOptionModal.setScale(0);
    this.characterOptionModal.setPosition(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );
  }
}
