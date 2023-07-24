import { Client, Databases, Storage } from "appwrite";
import { ApiEnums } from "../enums/apiEnums";
import { transliterate } from "transliteration";
import { generateIdToCorrectFormat } from "../helper/helperFunctions";
import { ID, Query } from "appwrite";
import { response } from "express";
import { threadId } from "worker_threads";
import { deleteCookies, getCookie, setCookie } from "../helper/cookie";

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
    userAvatarImageUrl: string,
    date: string
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
        date: date,
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

  getUsersReactions(gameName: string, reaction: string) {
    return this.databases().listDocuments(
      ApiEnums.silkRoadDatabaseID,
      ApiEnums.likesAndDeslikesForGamesCollectionId,
      [Query.equal("reaction", ["reaction", reaction])]
    );
  }

  insertUserReactionForGame(
    username: string,
    gameName: string,
    reaction: string,
    callBack: Function | undefined
  ) {
    this.databases()
      .updateDocument(
        ApiEnums.silkRoadDatabaseID,
        ApiEnums.likesAndDeslikesForGamesCollectionId,
        `${generateIdToCorrectFormat(
          transliterate(gameName)
        )}${generateIdToCorrectFormat(transliterate(username))}`,
        {
          user: username,
          gameName: gameName,
          reaction: reaction,
        }
      )
      .then(
        (response) => {
          callBack !== undefined && callBack();
        },
        (error) => {
          if (error.code === 404) {
            this.databases()
              .createDocument(
                ApiEnums.silkRoadDatabaseID,
                ApiEnums.likesAndDeslikesForGamesCollectionId,
                `${generateIdToCorrectFormat(
                  transliterate(gameName)
                )}${generateIdToCorrectFormat(transliterate(username))}`,
                {
                  user: username,
                  gameName: gameName,
                  reaction: reaction,
                }
              )
              .then((response) => {
                callBack !== undefined && callBack();
              });
          }
        }
      );
  }

  resetAllGames(username: string) {
    //batumisken
    return this.databases().updateDocument(
      ApiEnums.silkRoadDatabaseID,
      ApiEnums.batumisken_v_1_CollectionId,
      `defaultId${generateIdToCorrectFormat(transliterate(username))}`,
      {
        saveZoneIndex: 0,
      }
    );
  }

  uploadUserImage(username: string, file: any) {
    const storage = new Storage(this.client);

    storage
      .createFile(
        "6498150da54283132635",
        `defaultId${generateIdToCorrectFormat(transliterate(username))}`,
        file
      )
      .then(
        (response) => {
          console.log(response);

          this.databases()
            .updateDocument(
              ApiEnums.silkRoadDatabaseID,
              ApiEnums.usersCollectionID,
              `defaultId${generateIdToCorrectFormat(transliterate(username))}`,
              {
                avatar: `https://cloud.appwrite.io/v1/storage/buckets/6498150da54283132635/files/defaultId${generateIdToCorrectFormat(
                  transliterate(username)
                )}/view?project=649567e6984aa2b4d5ca&mode=admin`,
              }
            )
            .then((response) => {
              this.updateUserAvatarInComments(username);
            });
        },
        (error) => {
          if (error.code === 400) return alert("you can not use this image");
          if (error.code === 409) {
            storage
              .deleteFile(
                "6498150da54283132635",
                `defaultId${generateIdToCorrectFormat(transliterate(username))}`
              )
              .then(() => {
                storage
                  .createFile(
                    "6498150da54283132635",
                    `defaultId${generateIdToCorrectFormat(
                      transliterate(username)
                    )}`,
                    file
                  )
                  .then(() => {
                    this.databases()
                      .updateDocument(
                        ApiEnums.silkRoadDatabaseID,
                        ApiEnums.usersCollectionID,
                        `defaultId${generateIdToCorrectFormat(
                          transliterate(username)
                        )}`,
                        {
                          avatar: `https://cloud.appwrite.io/v1/storage/buckets/6498150da54283132635/files/defaultId${generateIdToCorrectFormat(
                            transliterate(username)
                          )}/view?project=649567e6984aa2b4d5ca&mode=admin`,
                        }
                      )
                      .then((response) => {
                        console.log("user avatar is changed");
                        this.updateUserAvatarInComments(username);
                      });
                  });
              });
          }
          console.log(error);
        }
      );
  }

  updateUserAvatarInComments(username: string) {
    this.databases()
      .listDocuments(
        ApiEnums.silkRoadDatabaseID,
        ApiEnums.gameCommentsCollectionId,
        [Query.equal("user", ["user", username])]
      )
      .then(
        (response) => {
          let lastDocumentIndex = response.total;
          response.documents.forEach((data) => {
            this.databases()
              .updateDocument(
                ApiEnums.silkRoadDatabaseID,
                ApiEnums.gameCommentsCollectionId,
                data.$id,
                {
                  userAvatarImageProfiles: `https://cloud.appwrite.io/v1/storage/buckets/6498150da54283132635/files/defaultId${generateIdToCorrectFormat(
                    transliterate(username)
                  )}/view?project=649567e6984aa2b4d5ca&mode=admin`,
                }
              )
              .then(
                (response) => {
                  lastDocumentIndex -= 1;
                  console.log(lastDocumentIndex);
                  if (lastDocumentIndex === 0) {
                    window.location.reload();
                  }
                },
                (error) => {
                  console.log(error);
                  window.location.reload();
                }
              );
          });
        },
        (error) => {
          if (error.code === 404) {
            console.log("user avatar is changed");
            window.location.reload();
          }
        }
      );
  }

  resetUserRating(username: string) {
    return this.databases().updateDocument(
      ApiEnums.silkRoadDatabaseID,
      ApiEnums.usersCollectionID,
      `defaultId${generateIdToCorrectFormat(transliterate(username))}`,
      {
        rating: 0,
      }
    );
  }

  changeUserName(oldName: string, newName: string) {
    //users
    this.databases()
      .getDocument(
        ApiEnums.silkRoadDatabaseID,
        ApiEnums.usersCollectionID,
        `defaultId${generateIdToCorrectFormat(transliterate(oldName))}`
      )
      .then(
        (response) => {
          const documentId = response.$id;
          const password = response.password;
          const avatar = response.avatar;
          const rating = response.rating;

          this.databases()
            .deleteDocument(
              ApiEnums.silkRoadDatabaseID,
              ApiEnums.usersCollectionID,
              documentId
            )
            .then((response) => {
              this.databases().createDocument(
                ApiEnums.silkRoadDatabaseID,
                ApiEnums.usersCollectionID,
                `defaultId${generateIdToCorrectFormat(transliterate(newName))}`,
                {
                  name: newName,
                  password,
                  avatar,
                  rating,
                }
              );
            })
            .then((response) => {
              console.log("user name is Changed");

              setCookie(
                "loginSession",
                JSON.stringify({
                  userName: newName,
                  password: JSON.parse(getCookie("loginSession")).password,
                }),
                2100
              );
              updateAllDatabase(this.databases);
            });
        },
        (error) => {
          console.log(error);
        }
      );

    function updateAllDatabase(database: () => Databases) {
      //batumisken
      database()
        .getDocument(
          ApiEnums.silkRoadDatabaseID,
          ApiEnums.batumisken_v_1_CollectionId,
          `defaultId${generateIdToCorrectFormat(transliterate(oldName))}`
        )
        .then(
          (response) => {
            const documentId = response.$id;
            const saveZoneIndex = response.saeZoneIndex;

            database()
              .deleteDocument(
                ApiEnums.silkRoadDatabaseID,
                ApiEnums.batumisken_v_1_CollectionId,
                documentId
              )
              .then((response) => {
                database()
                  .createDocument(
                    ApiEnums.silkRoadDatabaseID,
                    ApiEnums.batumisken_v_1_CollectionId,
                    `defaultId${generateIdToCorrectFormat(
                      transliterate(newName)
                    )}`,
                    {
                      user: newName,
                      saveZoneIndex,
                    }
                  )
                  .then((response) => {
                    console.log("user name in batumisken is changed");
                  });
              });
          },
          (error) => {
            console.log(error);
          }
        );

      //gameComments
      database()
        .listDocuments(
          ApiEnums.silkRoadDatabaseID,
          ApiEnums.gameCommentsCollectionId,
          [Query.equal("user", ["user", oldName])]
        )
        .then(
          (response) => {
            response.documents.forEach((data) => {
              database()
                .getDocument(
                  ApiEnums.silkRoadDatabaseID,
                  ApiEnums.gameCommentsCollectionId,
                  data.$id
                )
                .then((response) => {
                  const documentId = response.$id;
                  const gameName = response.gameName;
                  const comment = response.comment;
                  const userRating = response.userRating;
                  const userAvatarImageProfiles =
                    response.userAvatarImageProfiles;
                  const date = response.date;

                  database()
                    .deleteDocument(
                      ApiEnums.silkRoadDatabaseID,
                      ApiEnums.gameCommentsCollectionId,
                      documentId
                    )
                    .then((response) => {
                      database()
                        .createDocument(
                          ApiEnums.silkRoadDatabaseID,
                          ApiEnums.gameCommentsCollectionId,
                          `defaultId${generateIdToCorrectFormat(
                            transliterate(newName)
                          )}`,
                          {
                            user: newName,
                            gameName,
                            comment,
                            userRating,
                            userAvatarImageProfiles,
                            date,
                          }
                        )
                        .then((response) => {
                          console.log("user name in gameComments is changed");
                        });
                    });
                });
            });
          },
          (error) => {
            console.log(error);
          }
        );

      //like and deslikes
      database()
        .listDocuments(
          ApiEnums.silkRoadDatabaseID,
          ApiEnums.likesAndDeslikesForGamesCollectionId,
          [Query.equal("user", ["user", oldName])]
        )
        .then(
          (response) => {
            response.documents.forEach((data) => {
              database()
                .getDocument(
                  ApiEnums.silkRoadDatabaseID,
                  ApiEnums.likesAndDeslikesForGamesCollectionId,
                  data.$id
                )
                .then((response) => {
                  const documentId = response.$id;
                  const gameName = response.gameName;
                  const reaction = response.reaction;

                  database()
                    .deleteDocument(
                      ApiEnums.silkRoadDatabaseID,
                      ApiEnums.likesAndDeslikesForGamesCollectionId,
                      documentId
                    )
                    .then((response) => {
                      database()
                        .createDocument(
                          ApiEnums.silkRoadDatabaseID,
                          ApiEnums.likesAndDeslikesForGamesCollectionId,
                          `${generateIdToCorrectFormat(
                            transliterate(gameName)
                          )}${generateIdToCorrectFormat(
                            transliterate(newName)
                          )}`,
                          {
                            user: newName,
                            gameName,
                            reaction,
                          }
                        )
                        .then((response) => {
                          console.log(
                            "user name in likes and deslikes is changed"
                          );
                        });
                    });
                });
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
