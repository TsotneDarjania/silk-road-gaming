import { Api } from "../../../api/api";
import { ApiEnums } from "../../../enums/apiEnums";
import { getCookie } from "../../../helper/cookie";
import { gameConfig } from "../config/gameConfig";

const loginSession = getCookie("loginSession");

export class StartScene extends Phaser.Scene {
  api!: Api;
  constructor() {
    super("Start");
  }

  preload() {
    this.load.setPath(`${process.env.PUBLIC_URL}/assets`);

    //registrationModal
    this.load.image("white", "common/images/white.png");
  }

  create() {
    this.api = new Api();
    this.checkSession();
  }

  checkSession() {
    if (loginSession.length > 3) {
      this.initApi();
    } else {
      //@ts-ignore
      window.location = "../../";
    }
  }

  initApi() {
    this.api
      .getUserDataForGame(
        JSON.parse(loginSession).userName,
        ApiEnums.batumisken_v_1_CollectionId
      )
      .then(
        (response) => {
          console.log(response.saveZoneIndex);
          gameConfig.saveZoneIndex = response.saveZoneIndex;
          this.startGame();
        },
        (error) => {
          if (error.code === 404) {
            this.insertUserToGame();
          }
        }
      );
  }

  insertUserToGame() {
    this.api
      .initUserToGame(
        JSON.parse(loginSession).userName,
        ApiEnums.batumisken_v_1_CollectionId,
        {
          user: JSON.parse(loginSession).userName,
          saveZoneIndex: 0,
        }
      )
      .then(
        (response) => {
          this.startGame();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  startGame() {
    const api = new Api();

    api
      .insertLastGameData(JSON.parse(loginSession).userName, "Batumisken")
      .then(
        (response) => {
          gameConfig.username = JSON.parse(loginSession).userName;
          this.scene.start("Boot");
        },
        (error) => {
          console.log(error);
          gameConfig.username = JSON.parse(loginSession).userName;
          this.scene.start("Boot");
        }
      );
  }
}
