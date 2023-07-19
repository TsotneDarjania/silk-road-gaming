import { calculatePercentage } from "../../../tbilisi-batumi-1/helper/tatukaMath";
import { GameData } from "../../core/gameData";
import { Menu } from "../../scenes/menu";

export class RoomList extends Phaser.GameObjects.Container {
  modalElement!: Phaser.GameObjects.DOMElement;

  roomPositionY = 0;

  constructor(public scene: Menu, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setVisible(false);

    this.addTitle();
    this.addModal();
  }

  clearRoomList() {
    while (this.modalElement.node.firstChild) {
      this.modalElement.node.removeChild(this.modalElement.node.firstChild);
    }
    this.roomPositionY = 0;
  }

  addTitle() {
    const title = this.scene.add
      .text(
        0,
        -calculatePercentage(30, this.scene.game.canvas.height),
        "Online Rooms",
        {
          align: "center",
          fontSize: "23px",
          color: "#65D7FF",
          fontFamily: "Bungee",
        }
      )
      .setOrigin(0.5);

    this.add(title);
  }

  addModal() {
    this.modalElement = this.scene.add.dom(
      0,
      0,
      "div",
      "width:530px; height:450px; border: 3px solid #65D7FF; overflow-y:scroll;"
    );

    this.add(this.modalElement);
  }

  addNewRoom(character: string, owner: string) {
    const roomItem = this.scene.add
      .dom(
        0,
        this.roomPositionY,
        "div",
        "position:relative; width: 100%; height: 80px; background-color:#EDF2F1;"
      )
      .setOrigin(0);

    const characterImage = this.scene.add.dom(
      calculatePercentage(10, this.modalElement.displayWidth),
      calculatePercentage(50, roomItem.displayHeight),
      "img",
      "width:90px; height:90px"
    );
    const characterElement = characterImage.node as HTMLImageElement;
    characterElement.src = `${process.env.PUBLIC_URL}/assets/games/love-chaser/images/${character}-default.png`;
    roomItem.node.appendChild(characterImage.node);

    const ownerText = this.scene.add
      .dom(
        calculatePercentage(18, this.modalElement.displayWidth),
        calculatePercentage(50, roomItem.displayHeight),
        "p",
        "color:#2B2736; font-size:25px; text-align:center; font-family: Acme, sans-serif;"
      )
      .setText(owner)
      .setOrigin(0, 0.5);
    roomItem.node.appendChild(ownerText.node);

    this.modalElement.node.appendChild(roomItem.node);

    const joinButton = this.scene.add
      .dom(
        calculatePercentage(50, this.modalElement.displayWidth),
        calculatePercentage(40, roomItem.displayHeight),
        "button",
        `pposition:absolute; right:300px; background-color:#314859; font-family: Acme, sans-serif; border: 4px solid #577F9E; cursor:pointer; width: ${calculatePercentage(
          30,
          this.modalElement.displayWidth
        )}px; height:${calculatePercentage(
          60,
          roomItem.displayHeight
        )}px; color:white; font-size:24px;`,
        "join"
      )
      .setInteractive()
      .setOrigin(0, 0.5);

    joinButton.node.addEventListener("click", () => {
      this.scene.lobby.joinRoom(GameData.username, owner);
    });

    roomItem.node.appendChild(joinButton.node);

    this.roomPositionY += roomItem.displayHeight;
  }
}
