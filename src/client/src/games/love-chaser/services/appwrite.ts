import { Client, Databases, Query } from "appwrite";
import { ApiEnums } from "../../../enums/apiEnums";
import { generateIdToCorrectFormat } from "../../../helper/helperFunctions";
import { transliterate } from "transliteration";

export class AppWrite {
  client = new Client()
    .setEndpoint(ApiEnums.endpoint)
    .setProject(ApiEnums.projectID);

  databases = () => {
    return new Databases(this.client);
  };

  createRoom(owner: string, ownerCharacter: string, guestCharacter: string) {
    return this.databases().createDocument(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      `${generateIdToCorrectFormat(transliterate(owner))}`,
      {
        owner: generateIdToCorrectFormat(transliterate(owner)),
        guest: "none",
        ownerCharacter: ownerCharacter,
        guestCharacter: guestCharacter,
        ownerIsHere: 3,
      }
    );
  }

  joinRoom(roomName: string, user: string) {
    return this.databases().updateDocument(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      `${generateIdToCorrectFormat(transliterate(roomName))}`,
      {
        guest: user,
      }
    );
  }

  getOnlineRooms() {
    return this.databases().listDocuments(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      [Query.equal("guest", ["guest_index", "none"])]
    );
  }

  getRoomData(roomId: string) {
    return this.databases().getDocument(
      ApiEnums.silkRoadDatabaseID,
      "LoveChaserRooms",
      roomId
    );
  }
}
