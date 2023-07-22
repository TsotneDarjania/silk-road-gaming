import { transliterate } from "transliteration";
import { ApiEnums } from "../../../enums/apiEnums";
import { generateIdToCorrectFormat } from "../../../helper/helperFunctions";
import { OnlinePlayer } from "../characters/onlinePlayer";
import { Player } from "../characters/player";
import { GamePlay } from "../scenes/gamePlay";
import { myAbly } from "../services/ably";
import { AppWrite } from "../services/appwrite";
import { GameData } from "./gameData";
import { GamePlayInterface } from "../scenes/gameplayInterface";

export class GameManager extends Phaser.GameObjects.Layer {
  ably!: myAbly;

  gameIsFinished = false;

  ownerPositionX = 1590;
  ownerPositionY = 2380;

  guestPositionX = 2000;
  guestPositionY = 2380;

  appWrite!: AppWrite;

  isMatchStart = false;

  isOwner = false;

  playerLastDirection = "";

  isInitMatch = false;
  isStartMtch = false;

  matchTimer!: NodeJS.Timeout;

  gamePlayInterface!: GamePlayInterface;

  startSinchronization = false;

  constructor(public scene: GamePlay) {
    super(scene);

    this.init();
  }

  init() {
    this.ably = new myAbly(this);
    this.appWrite = new AppWrite();

    this.gamePlayInterface = this.scene.scene.get(
      "GamePlayInterface"
    ) as GamePlayInterface;

    this.appWrite.getRoomData(GameData.roomID).then(
      (response) => {
        this.initGame(response);
        this.updateRoomAvailability();
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

    if (
      generateIdToCorrectFormat(transliterate(GameData.username)) ===
      GameData.owner
    )
      this.isOwner = true;
    this.initPlayer();
    this.scene.initRoom();
    if (this.scene.gameManager.isOwner) {
      this.gamePlayInterface.gameStartModal.setVisible(true);
    }
    this.makeAblyConnection();
  }

  makeAblyConnection() {
    this.ably.makeConnection([GameData.username]);
  }

  /* 
  If someone is logged in to the room, the room should
  not be deleted due to a cron job on the Appwrite service
   */
  updateRoomAvailability() {
    setInterval(() => {
      this.appWrite
        .databases()
        .updateDocument(
          ApiEnums.silkRoadDatabaseID,
          "LoveChaserRooms",
          generateIdToCorrectFormat(transliterate(GameData.roomID)),
          {
            ownerIsHere: 3,
          }
        );
    }, 60 * 1000);
  }

  /* 
  This function happens automatically when second online 
  player enters the room, ie when the match is ready to start 
  */
  initMatch(user: string) {
    if (this.isInitMatch) return;

    if (this.isOwner && user !== GameData.username) GameData.guest = user;

    this.isInitMatch = true;

    this.gamePlayInterface.gameStartModal.setVisible(false);
    this.gamePlayInterface.ownerText.setText(`${GameData.owner}`);
    this.gamePlayInterface.guestText.setText(`${GameData.guest}`);
    this.gamePlayInterface.gameIndicators.setVisible(true);
    this.gamePlayInterface.timerText.setVisible(true);

    this.startMatchTimer();
    this.preparePlayersForStart();
    this.addSong();
    this.scene.addDoors();
  }

  addSong() {
    const song = this.scene.sound.add("song", {
      volume: 0.07,
      loop: true,
      rate: 1,
    });

    song.play();
  }

  preparePlayersForStart() {
    this.scene.player.canMotion = false;
    //reset player position
    this.scene.player.setPosition(
      this.isOwner ? this.ownerPositionX : this.guestPositionX,
      this.isOwner ? this.ownerPositionY : this.guestPositionY
    );
    this.initOnlinePlayer();
  }

  startMatchTimer() {
    let timer = 9;
    this.matchTimer = setInterval(() => {
      this.gamePlayInterface.timerText.setText(timer.toString());
      timer -= 1;

      if (timer < 0) {
        clearInterval(this.matchTimer);
        this.ably.sendEvent(["startMatch"]);
      }
    }, 1000);
  }

  startMatch() {
    if (this.isStartMtch) return;
    this.isStartMtch = true;

    this.scene.player.canMotion = true;
    this.gamePlayInterface.timerText.setVisible(false);
    this.gamePlayInterface.shadowImage.setVisible(false);

    this.startSinchronization = true;
    this.update();
  }

  update() {
    setInterval(() => {
      this.sendPlayerPositions();
    }, 500);

    this.scene.events.on("update", () => {
      if (this.startSinchronization === false) return;

      this.sendPlayerDirection();
    });
  }

  initPlayer() {
    const character = this.isOwner
      ? GameData.ownerCharacter
      : GameData.guestCharacter;

    this.scene.player = new Player(
      this.scene,
      this.isOwner ? this.ownerPositionX : this.guestPositionX,
      this.isOwner ? this.ownerPositionY : this.guestPositionY,
      `${character}-down-idle`
    ).setDepth(100);
  }

  initOnlinePlayer() {
    const character = this.isOwner
      ? GameData.guestCharacter
      : GameData.ownerCharacter;

    this.scene.onlinePlayer = new OnlinePlayer(
      this.scene,
      this.isOwner ? this.guestPositionX : this.ownerPositionX,
      this.isOwner ? this.guestPositionY : this.ownerPositionY,
      `${character}-down-idle`
    ).setDepth(100);

    this.addCollisionDetectionToOnlinePlayer();
  }

  addCollisionDetectionToOnlinePlayer() {
    this.scene.physics.add.collider(
      this.scene.onlinePlayer,
      this.scene.bricks,
      () => {}
    );

    this.scene.physics.add.collider(
      this.scene.onlinePlayer,
      this.scene.assets,
      () => {}
    );

    this.scene.physics.add.collider(
      this.scene.onlinePlayer,
      this.scene.player,
      () => {
        if (this.gameIsFinished) return;
        this.gameIsFinished = true;
        this.ably.sendEvent(["gameFinish", "owner"]);
      }
    );
  }

  sendPlayerPositions() {
    this.ably.snedPosiions([
      GameData.username,
      this.scene.player.x,
      this.scene.player.y,
    ]);
  }

  sendPlayerDirection() {
    if (this.scene.player.direction !== this.playerLastDirection) {
      this.playerLastDirection = this.scene.player.direction;
      this.ably.snedDirection([GameData.username, this.scene.player.direction]);
    }
  }

  getOnlinePlayerDirection(user: string, direction: string) {
    if (user !== GameData.username) {
      this.scene.onlinePlayer.direction = direction;
    }
  }

  getOnlinePlayerPositions(user: string, x: string, y: string) {
    if (user !== GameData.username) {
      this.scene.onlinePlayer.x = Number(x);
      this.scene.onlinePlayer.y = Number(y);
    }
  }

  gameFinish(winner: string) {
    this.scene.player.canMotion = false;
    this.scene.player.direction = "none";

    if (winner === "guest") {
      this.gamePlayInterface.finishTitle.setText("Winner Is " + GameData.guest);
      this.gamePlayInterface.finishModal.setVisible(true);

      if (this.isOwner) {
        this.gamePlayInterface.finishText.setText([
          "Unfortunately, you didn't manage to keep your relationship,",
          "your other half chose someone else...",
          "However, don't lose heart, you're still young!",
        ]);
      } else {
        this.gamePlayInterface.finishText.setText([
          "happy ! You've gotten out of a toxic relationship",
          "now you're free and happy as a bird",
        ]);
      }
    }

    if (winner === "owner") {
      this.gamePlayInterface.finishTitle.setText("Winner Is " + GameData.owner);
      this.gamePlayInterface.finishModal.setVisible(true);

      if (this.isOwner) {
        this.gamePlayInterface.finishText.setText([
          "Congratulations, you have won back the heart",
          "of your other half, now you are together again",
          "and not even the devil can separate your relationship",
        ]);
      } else {
        this.gamePlayInterface.finishText.setText([
          "Unfortunately, you will have to accept",
          "fate, you will always be together",
        ]);
      }
    }
  }
}
