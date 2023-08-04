import { Client, Databases, Query } from "appwrite";
import { ApiEnums } from "../../enums/apiEnums";
import { generateIdToCorrectFormat } from "../../helper/helperFunctions";
import { transliterate } from "transliteration";

export class LocalApi {
  client = new Client()
    .setEndpoint(ApiEnums.endpoint)
    .setProject(ApiEnums.projectID);

  databases = () => {
    return new Databases(this.client);
  };

  initUser(user: string) {
    return this.databases().createDocument(
      ApiEnums.silkRoadDatabaseID,
      "digital-arena",
      `${generateIdToCorrectFormat(transliterate(user))}`,
      {
        user: generateIdToCorrectFormat(transliterate(user)),
        record: 990,
      }
    );
  }

  initGame(user: string) {
    return this.databases().getDocument(
      ApiEnums.silkRoadDatabaseID,
      "digital-arena",
      `${generateIdToCorrectFormat(transliterate(user))}`
    );
  }

  insertNewRecord(user: string, newRecord: number) {
    return this.databases().updateDocument(
      ApiEnums.silkRoadDatabaseID,
      "digital-arena",
      `${generateIdToCorrectFormat(transliterate(user))}`,
      {
        record: newRecord,
      }
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
