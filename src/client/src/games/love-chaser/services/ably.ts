import { Realtime, Types } from "ably";
import { getCookie } from "../../../helper/cookie";
import { GameData } from "../core/gameData";
import { GameManager } from "../core/gameManager";

export class myAbly {
  channel!: Types.RealtimeChannelPromise;

  connections: Array<string> = [];

  ownerIsHere = 5;
  guestIsHere = 5;

  x = 200;
  y = 200;
  direction = "none";

  constructor(public gameManager: GameManager) {
    this.init();
    this.updateUsersConnection();
  }

  updateUsersConnection() {
    setInterval(() => {
      this.ownerIsHere -= 1;
      this.guestIsHere -= 1;
    }, 2000);
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

    //connections
    this.channel.subscribe(`${GameData.roomID}/connection}`, (data) => {
      const user = data.data[0];

      if (this.connections.includes(user) === false) {
        this.connections.push(user);
        this.channel.publish(`${GameData.roomID}/connection}`, [
          GameData.username,
        ]);
      }

      if (this.connections.length === 2) {
        this.gameManager.initMatch(user);
      }
    });

    //event
    this.channel.subscribe(`${GameData.roomID}/event}`, (data) => {
      const event = data.data[0];

      if (event === "startMatch") {
        this.gameManager.startMatch();
      }
    });
  }

  makeConnection(data: any) {
    this.channel.publish(`${GameData.roomID}/connection}`, data);
  }

  sendEvent(data: any) {
    this.channel.publish(`${GameData.roomID}/event}`, data);
  }
}
