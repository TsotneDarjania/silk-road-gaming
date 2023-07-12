import { Realtime, Types } from "ably";
import { getCookie } from "../../../helper/cookie";
import { GameData } from "./gameData";
import { GameManager } from "./gameManager";

export class myAbly {
  channel!: Types.RealtimeChannelPromise;

  players: Array<string> = [];

  x = 200;
  y = 200;
  direction = "none";

  constructor(public gameManager: GameManager) {
    this.init();
  }

  init() {
    const ably = new Realtime.Promise(
      "9s_j8A.-932Rg:azi3IQoeS1licHTXfOIcrgnmZ4XeJ0E0Urlk2vmvuHA"
    );
    ably.connection.once("connected").then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    // get the channel to subscribe to
    this.channel = ably.channels.get("quickstart");

    this.channel.subscribe(GameData.roomID, (data) => {
      const user = data.data[0];

      if (this.players.includes(user) === false) {
        this.players.push(user);
        this.channel.publish(GameData.roomID, [GameData.username]);
      }

      if (this.players.length == 2) {
        this.gameManager.startMatch();
      } else {
        return;
      }

      this.gameManager.synchronizeOnlinePlayerDirection(
        data.data[0],
        data.data[1]
      );
    });

    this.channel.subscribe(`${GameData.roomID}/positions}`, (data) => {
      this.gameManager.synchronizeOnlinePlayerPositions(
        data.data[0],
        data.data[1],
        data.data[2]
      );
    });
  }

  sendData(data: any) {
    this.channel.publish(GameData.roomID, data);
  }

  sendPositionsData(data: any) {
    this.channel.publish(`${GameData.roomID}/positions}`, data);
  }
}
