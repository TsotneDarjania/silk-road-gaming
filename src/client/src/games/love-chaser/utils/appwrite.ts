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
      `${generateIdToCorrectFormat(transliterate(GameData.owner))}`,
      {
        roomCode: getRandomFloat(0, 999999).toString(),
        owner: generateIdToCorrectFormat(transliterate(GameData.owner)),
        guest: "none",
        ownerCharacter: GameData.ownerCharacter,
        guestCharacter: GameData.guestCharacter,
      }
    );
  }

  getOnlineRooms() {
    return this.databases().listDocuments(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms"
    );
  }

  getRoomData() {
    return this.databases().getDocument(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      `${generateIdToCorrectFormat(transliterate(GameData.owner))}`
    );
  }

  deleteRoom() {
    return this.databases().deleteDocument(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      `${generateIdToCorrectFormat(transliterate(GameData.owner))}`
    );
  }

  addNewRoomEventListener() {
    this.client.subscribe("documents", (response) => {
      console.log(response.payload);

      //@ts-ignore
      if (response.payload.$collectionId === "LoveChaserRooms") {
        const menuScene = this.scene as Menu;
        menuScene.getOnlineRooms();
      }
    });
  }
}
