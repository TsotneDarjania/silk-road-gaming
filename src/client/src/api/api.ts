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

          if (response.total === 0) {
            window.location.reload();
          }
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

  changeUserName(
    oldName: string,
    newName: string,
    setWarningProps: any,
    setUserName: any
  ) {
    return this.databases()
      .listDocuments(ApiEnums.silkRoadDatabaseID, ApiEnums.usersCollectionID, [
        Query.equal("name", ["name", newName]),
      ])
      .then((response) => {
        if (response.total > 0) {
          console.log("this name already exist");

          setWarningProps({
            text: "this name already exist",
            show: true,
          });
        } else {
          setUserName(newName);
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
                      `defaultId${generateIdToCorrectFormat(
                        transliterate(newName)
                      )}`,
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
                        password: JSON.parse(getCookie("loginSession"))
                          .password,
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
        }
      });

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

      //Digital Arena
      database()
        .getDocument(
          ApiEnums.silkRoadDatabaseID,
          "digital-arena",
          `${generateIdToCorrectFormat(transliterate(oldName))}`
        )
        .then(
          (response) => {
            const documentId = response.$id;
            const record = response.record;

            database()
              .deleteDocument(
                ApiEnums.silkRoadDatabaseID,
                "digital-arena",
                documentId
              )
              .then((response) => {
                database()
                  .createDocument(
                    ApiEnums.silkRoadDatabaseID,
                    "digital-arena",
                    `${generateIdToCorrectFormat(transliterate(newName))}`,
                    {
                      user: newName,
                      record,
                    }
                  )
                  .then((response) => {
                    console.log("user name in Digital Arena is changed");
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
                          ID.unique(),
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
            response.documents.forEach((data, index) => {
              database()
                .getDocument(
                  ApiEnums.silkRoadDatabaseID,
                  ApiEnums.likesAndDeslikesForGamesCollectionId,
                  data.$id
                )
                .then((res) => {
                  const documentId = res.$id;
                  const gameName = res.gameName;
                  const reaction = res.reaction;

                  database()
                    .deleteDocument(
                      ApiEnums.silkRoadDatabaseID,
                      ApiEnums.likesAndDeslikesForGamesCollectionId,
                      documentId
                    )
                    .then((res) => {
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
                        .then(
                          (res) => {
                            if (index + 1 === response.total) {
                              console.log(
                                "user name in likes and deslikes is changed"
                              );
                            }
                          },
                          (error) => {}
                        );
                    });
                });
            });
          },
          (error) => {
            console.log(error);
          }
        );

      //last played Games
      database()
        .listDocuments(ApiEnums.silkRoadDatabaseID, "last-played-games", [
          Query.equal("user", ["user", oldName]),
        ])
        .then((response) => {
          response.documents.forEach((document, index) => {
            setTimeout(() => {
              database()
                .updateDocument(
                  ApiEnums.silkRoadDatabaseID,
                  "last-played-games",
                  document.$id,
                  {
                    user: newName,
                  }
                )
                .then(
                  (res) => {
                    if (response.total - 1 === index) {
                      console.log("finish last games update");
                    }
                  },
                  (error) => {
                    console.log(
                      `${document.$id}   /   ${newName}     /   ${oldName}`
                    );
                    console.log(error);
                    alert("something went wrong");
                    window.location.reload();
                  }
                );
            }, index * 1000);
          });
        });
    }
  }

  insertLastGameData(user: string, gameName: string) {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const gameDate = `${day}.${month}.${year}`;

    let dateIndex = 0;

    return this.databases()
      .listDocuments(ApiEnums.silkRoadDatabaseID, "last-played-games", [
        Query.equal("user", ["user", user]),
      ])
      .then((response) => {
        dateIndex = response.total;
        let alreadyExist = false;

        response.documents.forEach((document) => {
          if (document.gameName === gameName) {
            alreadyExist = true;

            this.databases()
              .deleteDocument(
                ApiEnums.silkRoadDatabaseID,
                "last-played-games",
                document.$id
              )
              .then(
                (response) => {
                  this.databases().createDocument(
                    ApiEnums.silkRoadDatabaseID,
                    "last-played-games",
                    ID.unique(),
                    {
                      user: user,
                      date: gameDate,
                      date_index: dateIndex,
                      gameName,
                    }
                  );
                },
                (error) => {
                  console.log(error);
                }
              );
          }
        });

        if (alreadyExist) return;

        this.databases().createDocument(
          ApiEnums.silkRoadDatabaseID,
          "last-played-games",
          ID.unique(),
          {
            user: user,
            date: gameDate,
            date_index: dateIndex,
            gameName,
          }
        );
      });
  }

  getLastPlayedGames(user: string) {
    return this.databases().listDocuments(
      ApiEnums.silkRoadDatabaseID,
      "last-played-games",
      [Query.equal("user", ["user", user])]
    );
  }
}
