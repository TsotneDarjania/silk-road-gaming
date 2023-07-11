import { Realtime, Types } from "ably";
import { getCookie } from "../../../helper/cookie";

export class myAbly {
  channel!: Types.RealtimeChannelPromise;

  userName = JSON.parse(getCookie("loginSession")).userName;

  x = 200;
  y = 200;
  direction = "none";

  constructor() {
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

    this.channel.subscribe("greeting", (data) => {
      this.x = data.data[0];
      this.y = data.data[1];
      this.direction = data.data[2];
    });
  }

  sendData(x: string, y: string, direction: string) {
    this.channel.publish("greeting", [x, y, direction]);
  }
}
