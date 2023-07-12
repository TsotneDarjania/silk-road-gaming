import { OnlinePlayer } from "../characters/onlinePlayer";
import { Player } from "../characters/player";
import { GamePlay } from "../scenes/gamePlay";
import { myAbly } from "./ably";
import { AppWrite } from "./appwrite";
import { GameData } from "./gameData";

export class GameManager {
  ably!: myAbly;

  ownerPositionX = 500;
  ownerPositionY = 500;

  guestPositionX = 900;
  guestPositionY = 900;

  appWrite!: AppWrite;

  isMatchStart = false;

  isOwner = false;

  playerLastDirection = "";

  constructor(public scene: GamePlay) {
    this.init();
  }

  startMatch() {
    if (this.isMatchStart === true) return;
    this.isMatchStart = true;
    console.log("match start");
    this.initOnlinePlayer();

    setInterval(() => {
      if (this.scene.player.direction !== this.playerLastDirection) {
        this.scene.gameManager.sendDirectionData(
          GameData.username,
          this.scene.player.direction
        );

        this.playerLastDirection = this.scene.player.direction;
      }
    }, 40);

    setInterval(() => {
      this.sentPositionsData(
        GameData.username,
        this.scene.player.x.toString(),
        this.scene.player.y.toString()
      );
    }, 500);
  }

  init() {
    this.appWrite = new AppWrite(this.scene);
    this.ably = new myAbly(this);

    this.appWrite.getRoomData(GameData.roomID).then(
      (response) => {
        this.initGame(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initGame(roomData: any) {
    GameData.owner = roomData.owner;
    GameData.guest = roomData.guest;
    GameData.ownerCharacter = roomData.ownerCharacter;
    GameData.guestCharacter = roomData.guestCharacter;

    if (GameData.username === GameData.owner) this.isOwner = true;

    this.ably.sendData([GameData.username]);

    this.initPlayer();
    this.scene.startGame();

    this.update();
  }

  update() {
    this.scene.events.on("update", () => {
      if (this.isMatchStart === false) return;
    });
  }

  initPlayer() {
    this.scene.player = new Player(
      this.scene,
      this.isOwner ? this.ownerPositionX : this.guestPositionX,
      this.isOwner ? this.ownerPositionX : this.guestPositionY,
      "down-idle"
    ).setDepth(100);
  }

  initOnlinePlayer() {
    this.scene.onlinePlayer = new OnlinePlayer(
      this.scene,
      this.isOwner ? this.guestPositionX : this.ownerPositionX,
      this.isOwner ? this.guestPositionY : this.ownerPositionX,
      "down-idle"
    ).setDepth(100);
  }

  sendDirectionData(user: string, direction: string) {
    this.ably.sendData([user, direction]);
  }

  sentPositionsData(user: string, x: string, y: string) {
    this.ably.sendPositionsData([user, x, y]);
  }

  synchronizeOnlinePlayerDirection(user: string, direction: string) {
    // console.log(user, direction);
    if (user !== GameData.username) {
      console.log(user);
      this.scene.onlinePlayer.direction = direction;
    }
  }

  synchronizeOnlinePlayerPositions(user: string, x: string, y: string) {
    if (user !== GameData.username) {
      console.log(user);
      this.scene.onlinePlayer.x = Number(x);
      this.scene.onlinePlayer.y = Number(y);
    }
  }
}
