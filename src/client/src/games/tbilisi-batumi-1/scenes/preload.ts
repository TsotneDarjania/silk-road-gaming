import Phaser from "phaser";

export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  init() {
    /** Create loading visualization here */
  }

  preload() {
    this.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) =>
      console.log(`loaded ${progress}%`)
    );

    this.load.setPath(`${process.env.PUBLIC_URL}/assets`);
    this.load.webFont(
      "mainFont",
      "https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2"
    );

    //Default image
    this.load.image("white", "white.png");

    //Songs
    this.load.audio("mtawmindaSong", ["music/songs/mtawminda.mp3"]);
    this.load.audio("rock-1", ["music/songs/rock-1.mp3"]);
    this.load.audio("lexseni", ["music/songs/lexseni.mp3"]);
    this.load.audio("taxi-1", ["music/songs/taxi-1.mp3"]);
    this.load.audio("gulmartali", ["music/songs/gulmartali.mp3"]);
    this.load.audio("russianSong", ["music/songs/russianSong.mp3"]);

    //Sound Effects
    this.load.audio("monetSound", ["music/effects/monet.mp3"]);
    this.load.audio("plugSound", ["music/effects/plug.mp3"]);
    this.load.audio("buttonSound", ["music/effects/button.mp3"]);
    this.load.audio("carExplotionSound", ["music/effects/car-explotion.mp3"]);
    this.load.audio("applauseSound", ["music/effects/applause.mp3"]);
    this.load.audio("evilLaughSound", ["music/effects/evil-laugh.mp3"]);
    this.load.audio("RSDeadScreamSound", ["music/effects/blyad.mp3"]);
    this.load.audio("bodyFail", ["music/effects/bodyFail.mp3"]);

    //asteroid Animation
    this.load.spritesheet("asteroid", "spritesheets/asteroid.png", {
      frameWidth: 152,
      frameHeight: 150,
    });
    //bonFire Animation
    this.load.spritesheet("bonfire", "spritesheets/bonfire.png", {
      frameWidth: 300,
      frameHeight: 150.5,
    });
    //car Explotion
    this.load.spritesheet("carExplosion", "spritesheets/car-explosion.png", {
      frameWidth: 300,
      frameHeight: 300,
    });

    //Angel
    this.load.image("angelHead", "angel/head.png");
    this.load.image("angelWing", "angel/wing.png");
    this.load.image("angelBody", "angel/body.png");
    this.load.image("angelCircle", "angel/circle.png");

    //Demon
    this.load.image("demonHead", "demon/head.png");
    this.load.image("demonBody", "demon/body.png");
    this.load.image("demonWing", "demon/wing.png");

    //GamePlay Menu
    this.load.image("speedometer", `menu/gamePlay/speedometer.png`);
    this.load.image("speedometer-arrow", `menu/gamePlay/speedometer-arrow.png`);
    this.load.image("gamePlayMenuIcon", `menu/gamePlay/menuIcon.png`);
    this.load.image("gameplayMenuContinueButton", `menu/gamePlay/continue.png`);
    this.load.image(
      "gameplayBackToMainMenuButton",
      `menu/gamePlay/mainMenu.png`
    );
    this.load.image("gameplayRecordsIcon", `menu/gamePlay/recordsIcon.png`);
    this.load.image("radioGreenButton", `menu/gamePlay/radio-green-button.png`);
    this.load.image("radioRedButton", `menu/gamePlay/radio-red-button.png`);
    this.load.image("lariIcon", `menu/gamePlay/lari.png`);
    this.load.image("veteran", `menu/gamePlay/veteran.png`);

    // Car
    this.load.svg("carBody", `car/body.svg`);
    this.load.svg("carTire", `car/tire.svg`);
    this.load.svg("carBag", `car/bag.svg`);
    this.load.svg("carBoy", `car/boy.svg`);

    this.load.json("carMeshe", `car/car.json`);

    //Rock
    this.load.json("rockMeshe", "rock/rock.json");
    this.load.image("rock", "rock/rock.png");

    //tbilisi builds
    this.load.image("tbilisi-build-1", `tbilisi/tbilisi-build-1.png`);
    this.load.image("tbilisi-build-2", `tbilisi/tbilisi-build-2.png`);
    this.load.image("tbilisi-build-3", `tbilisi/tbilisi-build-3.png`);
    this.load.image("tbilisi-build-4", `tbilisi/tbilisi-build-4.png`);
    this.load.image("tbilisi-build-5", `tbilisi/build-5.png`);
    this.load.image("tbilisi-build-6", `tbilisi/build-6.png`);
    this.load.image("tbilisi-build-7", `tbilisi/build-7.png`);
    this.load.image("tbilisi-build-8", `tbilisi/build-8.png`);
    this.load.image("tbilisi-build-9", `tbilisi/build-9.png`);
    this.load.image("tbilisi-build-10", `tbilisi/build-10.png`);
    this.load.image("tbilisi-build-11", `tbilisi/build-11.png`);

    //Mtscketa Builds
    this.load.image("mtskheta-build-1", `roadToGori/mtskheta/build-1.png`);
    this.load.image("mtskheta-build-2", `roadToGori/mtskheta/build-2.png`);
    this.load.image("mtskheta-build-3", `roadToGori/mtskheta/build-3.png`);
    this.load.image("svetitskhoveli", `roadToGori/mtskheta/svetitskhoveli.png`);

    //Gori Buils
    this.load.image("gori-castle", "roadToGori/gori/gori-castle.png");

    //roadToGori
    this.load.image("meadow", "roadToGori/meadow.png");
    this.load.image("hill", "roadToGori/hill.png");
    this.load.image("mountain-1", "roadToGori/mountain-1.png");
    this.load.image("mountain-2", "roadToGori/mountain-2.png");
    this.load.image("village-house-1", "roadToGori/village-house-1.png");
    this.load.image("georgia-flag", "roadToGori/georgia-flag.png");

    //Map Assets
    this.load.image("map-information-icon", "map/assets/info.png");
    this.load.image("map-money-icon", "map/assets/money-icon.png");
    this.load.image("50-tetri", "map/assets/50-tetri.png");
    this.load.image("1-lari", "map/assets/1-lari.png");
    this.load.image("2-lari", "map/assets/2-lari.png");
    this.load.image("flower-1", "map/assets/flower-1.png");
    this.load.image("flower-2", "map/assets/flower-2.png");
    this.load.image("flower-3", "map/assets/flower-3.png");
    this.load.image("flower-4", "map/assets/flower-4.png");
    this.load.image("grass-1", "map/assets/grass-1.png");
    this.load.image("tree-1", "map/assets/tree-1.png");
    this.load.image("small-traparet", "map/assets/small-traparet.png");
    this.load.image("big-traparet", "map/assets/big-traparet.png");
    this.load.image("musicIcon", "map/assets/musicIcon.png");
    this.load.image("bombIcon", "map/assets/bombIcon.png");
    this.load.image("modal", "map/assets/modal.png");
    this.load.image("ok-button", "map/assets/ok-button.png");
    this.load.image("star", "map/assets/star.png");
    this.load.image("govermentStation", "map/assets/govermentStation.png");
    this.load.image("russianTank", `map/assets/russian-tank.png`);

    //Menu Scene
    this.load.image("menuBackground", "menu/menuScene/background.png");
    this.load.svg("menuCarBody", "menu/menuScene/carBody.svg");
    this.load.svg("menuCarTire", "menu/menuScene/tire.svg");
    this.load.image("plug", "menu/menuScene/plug.png");
    this.load.image("menuButton", "menu/menuScene/button.png");

    //Russian Soldier
    this.load.image("RSHead", "russianSoldier/head.png");
    this.load.image("RSBody", "russianSoldier/body.png");
    this.load.image("RSLeftLeg", "russianSoldier/leftLeg.png");
    this.load.image("RSRightLeg", "russianSoldier/rightLeg.png");
    this.load.image("RSLeftHand", "russianSoldier/leftHand.png");
    this.load.image("RSRightHand", "russianSoldier/rightHand.png");

    this.load.image("RSBullet", "russianSoldier/bullet.png");

    //train
    this.load.image("rail", "train/rail.png");
    this.load.image("train", "train/train.png");
    this.load.image("train-circle", "train/circle.png");
    this.load.image("vagon", "train/vagon.png");
  }

  create() {
    this.scene.start("GamePlay");
  }
}
