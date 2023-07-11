import { OnlinePlayer } from "../characters/onlinePlayer";
import { Player } from "../characters/player";
import { GamePlay } from "../scenes/gamePlay";
import { AppWrite } from "./appwrite";
import { GameData } from "./gameData";

export class GameManager {
  ownerPositionX = 500;
  ownerPositionY = 500;

  guestPositionX = 700;
  guestPositionY = 700;

  appWrite!: AppWrite;

  isOwner = false;

  constructor(public scene: GamePlay) {
    this.init();
  }

  init() {
    this.appWrite = new AppWrite(this.scene);

    this.appWrite.getRoomData().then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    if (GameData.username === GameData.owner) {
      this.isOwner = true;
    }

    this.initPlayer();
    this.scene.startGame();
  }

  initPlayer() {
    this.scene.player = new Player(
      this.scene,
      this.isOwner ? this.ownerPositionX : this.guestPositionX,
      this.isOwner ? this.ownerPositionX : this.ownerPositionY,
      "down-idle"
    ).setDepth(100);
  }

  initOnlinePlayer() {
    this.scene.onlinePlayer = new OnlinePlayer(
      this.scene,
      this.isOwner ? this.ownerPositionX : this.guestPositionX,
      this.isOwner ? this.ownerPositionX : this.ownerPositionY,
      "down-idle"
    ).setDepth(100);
  }
}
