import Phaser from "phaser";
import { LoadingScreen } from "../../common/loadingScreen";

export class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.setPath(`${process.env.PUBLIC_URL}/assets`);
    this.load.webFont(
      "mainFont",
      "https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2"
    );
    //Default image
    this.load.image("white", "white.png");

    // load spinning icon
    this.load.image("loading-spin", "games/common/images/loading-circle.png");
  }

  create() {
    this.scene.start("Preload");
  }
}
