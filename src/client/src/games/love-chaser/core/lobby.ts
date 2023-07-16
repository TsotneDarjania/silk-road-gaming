import { transliterate } from "transliteration";
import { ApiEnums } from "../../../enums/apiEnums";
import { generateIdToCorrectFormat } from "../../../helper/helperFunctions";
import { Menu } from "../scenes/menu";
import { AppWrite } from "../services/appwrite";
import { GameData } from "./gameData";

export class Lobby {
  appwrite!: AppWrite;

  databaseGameRooms: Array<string> = [];
  menuGameRooms: Array<string> = [];

  constructor(public scene: Menu) {
    this.appwrite = new AppWrite();
    this.addNewRoomEventListener();
  }

  addNewRoomEventListener() {
    this.appwrite.client.subscribe("documents", (response) => {
      //@ts-ignore
      if (response.payload.$collectionId === "LoveChaserRooms") {
        this.appwrite.getOnlineRooms().then(
          (response) => {
            response.documents.map((room) => {
              this.databaseGameRooms = [];
              this.databaseGameRooms.push(room.$id);
            });

            if (this.scene.roomList.modalElement.node === null) return;
            if (
              JSON.stringify(this.databaseGameRooms) ===
              JSON.stringify(this.menuGameRooms)
            ) {
              return;
            }

            this.menuGameRooms = this.databaseGameRooms;
            this.scene.roomList.clearRoomList();
            this.getOnlineRooms();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  deleteRoom(roomName: string) {
    return this.appwrite
      .databases()
      .deleteDocument(ApiEnums.silkRoadDatabaseID, "LoveChaserRooms", roomName);
  }

  getOnlineRooms() {
    this.appwrite.getOnlineRooms().then(
      (response) => {
        response.documents.map((room) => {
          this.scene.roomList.addNewRoom(room.ownerCharacter, room.owner);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createRoom(owner: string, ownerCharacter: string) {
    const guestCharacter = ownerCharacter === "boy" ? "girl" : "boy";

    this.appwrite.createRoom(owner, ownerCharacter, guestCharacter).then(
      (response) => {
        GameData.roomID = generateIdToCorrectFormat(transliterate(owner));
        this.scene.scene.start("GamePlay");
      },
      (error) => {
        if (error.code === 409) return this.scene.scene.start("GamePlay");
        console.log(error);
      }
    );
  }

  joinRoom(guest: string, roomName: string) {
    this.appwrite.joinRoom(roomName, guest).then(
      (response) => {
        GameData.roomID = generateIdToCorrectFormat(transliterate(roomName));
        this.scene.scene.start("GamePlay");
      },
      (error) => {
        if (error.code === 404) return alert("this room is not exist");
        console.log(error);
      }
    );
  }
}
