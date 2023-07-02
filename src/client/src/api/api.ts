import { Client, Databases, Storage } from "appwrite";
import { ApiEnums } from "../enums/apiEnums";
import { transliterate } from "transliteration";
import { generateIdToCorrectFormat } from "../helper/helperFunctions";
import { ID, Query } from "appwrite";

export class Api {
  client = new Client()
    .setEndpoint(ApiEnums.endpoint)
    .setProject(ApiEnums.projectID);

  databases = () => {
    return new Databases(this.client);
  };

  storage = () => {
    return new Storage(this.client);
  };

  userRegistration = (name: string, password: string) => {
    return this.databases().createDocument(
      ApiEnums.silkRoadDatabaseID,
      ApiEnums.usersCollectionID,
      `defaultId${generateIdToCorrectFormat(transliterate(name))}`,
      {
        name,
        password,
        avatar:
          "https://cloud.appwrite.io/v1/storage/buckets/6498150da54283132635/files/default/view?project=649567e6984aa2b4d5ca&mode=admin",
      }
    );
  };

  userLogin = (name: string) => {
    return this.databases().getDocument(
      ApiEnums.silkRoadDatabaseID,
      ApiEnums.usersCollectionID,
      `defaultId${generateIdToCorrectFormat(transliterate(name))}`
    );
  };

  getUserDataForGame(username: string, collectionId: string) {
    return this.databases().getDocument(
      ApiEnums.silkRoadDatabaseID,
      collectionId,
      `defaultId${generateIdToCorrectFormat(transliterate(username))}`
    );
  }

  initUserToGame(username: string, collectionId: string, data: any) {
    return this.databases().createDocument(
      ApiEnums.silkRoadDatabaseID,
      collectionId,
      `defaultId${generateIdToCorrectFormat(transliterate(username))}`,
      data
    );
  }

  saveUserDataToGame(username: string, collectionId: string, data: any) {
    return this.databases().updateDocument(
      ApiEnums.silkRoadDatabaseID,
      collectionId,
      `defaultId${generateIdToCorrectFormat(transliterate(username))}`,
      data
    );
  }

  insertCommentForGame(
    username: string,
    collectionId: string,
    gameName: string,
    comment: string,
    userRating: number,
    userAvatarImageUrl: string
  ) {
    return this.databases().createDocument(
      ApiEnums.silkRoadDatabaseID,
      collectionId,
      ID.unique(),
      {
        user: username,
        gameName: gameName,
        comment: comment,
        userRating: userRating,
        userAvatarImageProfiles: userAvatarImageUrl,
      }
    );
  }

  getGameComments(collectionId: string, gameName: string) {
    return this.databases().listDocuments(
      ApiEnums.silkRoadDatabaseID,
      collectionId,
      [Query.equal("gameName", ["game_name", gameName])]
    );
  }
}
