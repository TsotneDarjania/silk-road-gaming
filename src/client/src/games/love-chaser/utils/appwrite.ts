import { Client, Databases } from "appwrite";
import { ApiEnums } from "../../../enums/apiEnums";
import { generateIdToCorrectFormat } from "../../../helper/helperFunctions";
import { transliterate } from "transliteration";
import { GameData } from "./gameData";
import { getRandomFloat } from "../../tbilisi-batumi-1/helper/tatukaMath";
import { Menu } from "../scenes/menu";

export class AppWrite {
  constructor(public scene: Phaser.Scene) {}

  client = new Client()
    .setEndpoint(ApiEnums.endpoint)
    .setProject(ApiEnums.projectID);

  databases = () => {
    return new Databases(this.client);
  };

  initOwnerPlayer() {
    return this.databases().createDocument(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      `${generateIdToCorrectFormat(transliterate(GameData.username))}`,
      {
        roomCode: Math.floor(Math.random() * 100000000).toString(),
        owner: generateIdToCorrectFormat(transliterate(GameData.username)),
        guest: "none",
        ownerCharacter: GameData.ownerCharacter,
        guestCharacter: GameData.guestCharacter,
      }
    );
  }

  joinGuestPlayer(roomId: string, user: string) {
    return this.databases().updateDocument(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      roomId,
      {
        guest: user,
      }
    );
  }

  getOnlineRooms() {
    return this.databases().listDocuments(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms"
    );
  }

  getRoomData(roomId: string) {
    return this.databases().getDocument(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      roomId
    );
  }

  deleteRoom() {
    return this.databases().deleteDocument(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      `${generateIdToCorrectFormat(transliterate(GameData.owner))}`
    );
  }

  addNewRoomEventListener(scene: string) {
    if (scene !== "Menu") return;

    this.client.subscribe("documents", (response) => {
      // console.log(response.payload);

      //@ts-ignore
      if (response.payload.$collectionId === "LoveChaserRooms") {
        const menuScene = this.scene as Menu;
        menuScene.newRoomEvent();
      }
    });
  }
}
