import { getCookie, setCookie } from "../../../helper/cookie";
import { myAbly } from "../services/ably";
import Wall from "../gameObjects/wall";
import { Player } from "./../characters/player";
import { GameManager } from "../core/gameManager";
import { OnlinePlayer } from "../characters/onlinePlayer";
import { GamePlayInterface } from "./gameplayInterface";
import { MapKey } from "../gameObjects/mapKey";
import { Door } from "../gameObjects/door";
import { ClubLight } from "../gameObjects/clubLight";
import { GamePlayHeart } from "../gameObjects/gamePlayHeart";

export class GamePlay extends Phaser.Scene {
  player!: Player;
  onlinePlayer!: OnlinePlayer;

  interface!: GamePlayInterface;

  cameraZoom = 1;
  bricks: Array<Phaser.Physics.Arcade.Image> = [];

  mapBackground!: Phaser.GameObjects.Container;
  assets: Array<Phaser.Physics.Arcade.Image> = [];

  gameManager!: GameManager;

  ably!: myAbly;

  updateProcess = false;

  currentDoor!: Door;

  constructor() {
    super("GamePlay");
  }

  preload() {
    this.anims.create({
      key: "boy-down",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("boy-down", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "boy-left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("boy-left", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "boy-right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("boy-right", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "boy-up",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("boy-up", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "boy-down-idle",
      frameRate: 7,
      frames: this.anims.generateFrameNumbers("boy-down-idle", {
        start: 0,
        end: 1,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "girl-down-idle",
      frameRate: 7,
      frames: this.anims.generateFrameNumbers("girl-down-idle", {
        start: 0,
        end: 1,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "girl-right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("girl-right", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "girl-left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("girl-left", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "girl-up",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("girl-up", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "girl-down",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("girl-down", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });
  }

  create() {
    this.gameManager = new GameManager(this);
    this.scene.launch("GamePlayInterface");
  }

  initRoom() {
    this.createMap();
    this.addAssets();
    this.addKeys();
    this.addClubLights();
    this.addHearts();

    this.setCameraSettings();
    this.addColliderDetectinos();

    this.updateProcess = true;
  }

  addHearts() {
    new GamePlayHeart(this, 320, 1260).setDepth(-1);
    new GamePlayHeart(this, 120, 2290).setDepth(-1);
    new GamePlayHeart(this, 3300, 1600).setDepth(-1);
    new GamePlayHeart(this, 3500, 100).setDepth(-1);
    new GamePlayHeart(this, 2970, 400).setDepth(-1);
    new GamePlayHeart(this, 1400, 1060).setDepth(-1);
  }

  addColliderDetectinos() {
    this.physics.add.collider(this.player, this.assets, () => {});
    this.physics.add.collider(this.player, this.bricks, () => {});
  }

  addClubLights() {
    new ClubLight(this, 660, 1920, 0xeb9a3b).setScale(0.4).startAnimation(2000);
    new ClubLight(this, 510, 1920, 0x3da3f5).setScale(0.4).startAnimation(1800);
    new ClubLight(this, 357, 1920, 0xa66d9a).setScale(0.4).startAnimation(1200);
    new ClubLight(this, 200, 1920, 0x43de71).setScale(0.4).startAnimation(1600);

    new ClubLight(this, 2330, 1630, 0x43de71)
      .setScale(0.5)
      .startAnimation(1000);

    new ClubLight(this, 2530, 1630, 0xa66d9a)
      .setScale(0.5)
      .startAnimation(1300);

    new ClubLight(this, 2730, 1630, 0xeb9a3b).setScale(0.5).startAnimation(900);

    new ClubLight(this, 2930, 1630, 0xeb9a3b)
      .setScale(0.5)
      .startAnimation(1800);

    new ClubLight(this, 380, 370, 0xeb9a3b).setScale(0.5).startAnimation(600);
    new ClubLight(this, 580, 370, 0xa66d9a).setScale(0.5).startAnimation(900);
    new ClubLight(this, 780, 370, 0x43de71).setScale(0.5).startAnimation(700);
    new ClubLight(this, 980, 370, 0x3da3f5).setScale(0.5).startAnimation(1000);
  }

  addAssets() {
    this.add.image(400, 20, "bookshelf");

    const box_1 = this.physics.add
      .image(100, 210, "box-1")
      .setImmovable(true)
      .setDisplaySize(70, 70);
    this.assets.push(box_1);

    const box_2 = this.physics.add
      .image(100, 140, "box-1")
      .setImmovable(true)
      .setDisplaySize(70, 70);
    this.assets.push(box_2);

    const box_3 = this.physics.add
      .image(300, 210, "box-1")
      .setImmovable(true)
      .setDisplaySize(70, 70);
    this.assets.push(box_3);

    const box_4 = this.physics.add
      .image(300, 140, "box-1")
      .setImmovable(true)
      .setDisplaySize(70, 70);
    this.assets.push(box_4);

    const bed = this.physics.add
      .image(1770, 220, "bed")
      .setScale(0.7)
      .setSize(220, 200)
      .setOffset(44, 40)
      .setImmovable(true);
    this.assets.push(bed);

    const table_1 = this.physics.add
      .image(150, 500, "table")
      .setSize(70, 70)
      .setOffset(14, 13)
      .setImmovable(true);
    this.assets.push(table_1);

    const table_2 = this.physics.add
      .image(150, 650, "table")
      .setSize(70, 70)
      .setOffset(14, 13)
      .setImmovable(true);
    this.assets.push(table_2);

    const table_3 = this.physics.add
      .image(150, 800, "table")
      .setSize(70, 70)
      .setOffset(14, 13)
      .setImmovable(true);
    this.assets.push(table_3);

    const table_4 = this.physics.add
      .image(150, 950, "table")
      .setSize(70, 70)
      .setOffset(14, 13)
      .setImmovable(true);
    this.assets.push(table_4);

    const toliet_1 = this.physics.add
      .image(170, 2450, "toliet")
      .setScale(1.35)
      .setImmovable(true);
    this.assets.push(toliet_1);

    const toliet_2 = this.physics.add
      .image(320, 2450, "toliet")
      .setScale(1.35)
      .setImmovable(true);
    this.assets.push(toliet_2);

    const toliet_3 = this.physics.add
      .image(470, 2450, "toliet")
      .setScale(1.35)
      .setImmovable(true);
    this.assets.push(toliet_3);

    const toliet_4 = this.physics.add
      .image(620, 2450, "toliet")
      .setScale(1.35)
      .setImmovable(true);
    this.assets.push(toliet_4);

    const toliet_5 = this.physics.add
      .image(770, 2450, "toliet")
      .setScale(1.35)
      .setImmovable(true);
    this.assets.push(toliet_5);

    const armChair = this.physics.add
      .image(1120, 1850, "arm-chair")
      .setScale(0.5)
      .setImmovable(true);
    this.assets.push(armChair);

    const armChair_2 = this.physics.add
      .image(1400, 2080, "arm-chair")
      .setRotation(1.57)
      .setOffset(0, 0)
      .setFlipY(true)
      .setFlipX(true)
      .setScale(0.5)
      .setImmovable(true);
    armChair_2.setSize(armChair.displayHeight * 2, armChair.displayWidth * 2);
    this.assets.push(armChair_2);

    const armChair_3 = this.physics.add
      .image(1600, 2080, "arm-chair")
      .setRotation(1.57)
      .setOffset(0, 0)
      .setFlipY(true)
      .setFlipX(true)
      .setScale(0.5)
      .setImmovable(true);
    armChair_3.setSize(armChair.displayHeight * 2, armChair.displayWidth * 2);
    this.assets.push(armChair_3);

    const armChair_4 = this.physics.add
      .image(3220, 200, "arm-chair")
      .setScale(0.5)
      .setImmovable(true);
    this.assets.push(armChair_4);

    const armChair_5 = this.physics.add
      .image(3220, 450, "arm-chair")
      .setScale(0.5)
      .setImmovable(true);
    this.assets.push(armChair_5);

    this.add.image(1590, 1820, "stage").setScale(0.7).setTint(0x082c4d);
    this.add.image(2390, 1880, "stage").setScale(0.7).setTint(0x082c4d);
    this.add.image(2690, 1880, "stage").setScale(0.7).setTint(0x082c4d);

    this.add.image(510, 650, "stage").setScale(0.7).setTint(0x082c4d);
    this.add.image(810, 650, "stage").setScale(0.7).setTint(0x082c4d);

    const bar_1 = this.physics.add
      .image(2690, 2485, "bar-bottom-part")
      .setImmovable(true)
      .setScale(0.65)
      .setSize(238, 70)
      .setOffset(13, 90)
      .setDepth(400);
    this.assets.push(bar_1);

    const bar_2 = this.physics.add
      .image(2390, 2485, "bar-bottom-part")
      .setImmovable(true)
      .setScale(0.65)
      .setSize(238, 70)
      .setOffset(13, 90)
      .setDepth(400);
    this.assets.push(bar_2);

    const bar_3 = this.physics.add
      .image(2990, 2485, "bar-bottom-part")
      .setImmovable(true)
      .setScale(0.65)
      .setSize(238, 70)
      .setOffset(13, 90)
      .setDepth(400);
    this.assets.push(bar_3);

    const bar_4 = this.physics.add
      .image(2480, 215, "bar-bottom-part")
      .setImmovable(true)
      .setScale(0.65)
      .setSize(238, 70)
      .setOffset(13, 90)
      .setDepth(400);
    this.assets.push(bar_4);

    const bar_5 = this.physics.add
      .image(2240, 215, "bar-bottom-part")
      .setImmovable(true)
      .setScale(0.65)
      .setSize(238, 70)
      .setOffset(13, 90)
      .setDepth(400);
    this.assets.push(bar_5);
  }

  addKeys() {
    const door_1 = new Door(this, 1015, 2500);
    const key_1 = new MapKey(this, 1100, 2300, door_1);

    const door_2 = new Door(this, 1013, 1590);
    const key_2 = new MapKey(this, 1100, 1690, door_2);

    const door_3 = new Door(this, 1773, 1270);
    const key_3 = new MapKey(this, 1970, 1180, door_3);

    const door_4 = new Door(this, 2373, 2170);
    const key_4 = new MapKey(this, 2170, 2320, door_4);

    const door_5 = new Door(this, 2803, 1500);
    const key_5 = new MapKey(this, 3000, 1520, door_5);

    const door_6 = new Door(this, 3460, 1570);
    const key_6 = new MapKey(this, 3370, 1690, door_6);

    const door_7 = new Door(this, 2742, 770);
    const key_7 = new MapKey(this, 2630, 870, door_7);

    const door_8 = new Door(this, 1267, 870);
    const key_8 = new MapKey(this, 1190, 750, door_8);
  }

  createMap() {
    this.addMapBackground();

    //hideZones
    this.add
      .image(105, 1550, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(125, 120)
      .setDepth(400);

    this.add
      .image(105, 1200, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(125, 120)
      .setDepth(400);

    this.add
      .image(605, 1430, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(325, 100)
      .setDepth(400);

    this.add
      .image(1365, 1430, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(135, 100)
      .setDepth(400);

    this.add
      .image(1895, 1790, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(140, 200)
      .setDepth(400);

    this.add
      .image(3112, 2106, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(110, 160)
      .setDepth(400);

    this.add
      .image(3532, 1806, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(74, 160)
      .setDepth(400);

    this.add
      .image(2886, 960, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(200, 100)
      .setDepth(400);

    this.add
      .image(2986, 644, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(200, 100)
      .setDepth(400);

    this.add
      .image(2236, 654, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(200, 200)
      .setDepth(400);

    this.add
      .image(1200, 100, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(200, 123)
      .setDepth(400);

    this.add
      .image(1170, 600, "default-image")
      .setTint(0x43de71)
      .setDisplaySize(110, 183)
      .setDepth(400);

    //borders
    new Wall(this, "horizontal", 13).setPosition(100, 0);
    new Wall(this, "vertical", 9).setPosition(1, 175);
    new Wall(this, "horizontal", 13).setPosition(100, 2577);
    new Wall(this, "vertical", 9).setPosition(3610, 99);
    new Wall(this, "vertical", 1).setPosition(3610, 2479);

    new Wall(this, "vertical", 4).setPosition(1788, 1640);
    new Wall(this, "vertical", 1).setPosition(1273, 2440);
    new Wall(this, "horizontal", 2).setPosition(1373, 2190);
    new Wall(this, "vertical", 3).setPosition(1010, 1775);
    new Wall(this, "horizontal", 4).setPosition(150, 2190);

    new Wall(this, "horizontal", 4).setPosition(500, 1520);
    new Wall(this, "vertical", 2).setPosition(840, 1620);
    new Wall(this, "horizontal", 2).setPosition(305, 1670);
    new Wall(this, "horizontal", 2).setPosition(305, 1740);
    new Wall(this, "horizontal", 2).setPosition(305, 1900);
    new Wall(this, "vertical", 2).setPosition(208, 1210);
    new Wall(this, "horizontal", 3).setPosition(305, 1340);
    new Wall(this, "vertical", 1).setPosition(1108, 1340);
    new Wall(this, "horizontal", 6).setPosition(385, 1180);
    new Wall(this, "horizontal", 4).setPosition(1360, 1340);

    new Wall(this, "vertical", 2).setPosition(2008, 1640);
    new Wall(this, "horizontal", 3).setPosition(1960, 2095);
    new Wall(this, "horizontal", 3).setPosition(2360, 1595);
    new Wall(this, "vertical", 2).setPosition(3018, 1769);
    new Wall(this, "horizontal", 4).setPosition(2260, 2227);

    new Wall(this, "vertical", 3).setPosition(3458, 1759);
    new Wall(this, "horizontal", 1).setPosition(3195, 1949);
    new Wall(this, "horizontal", 1).setPosition(3282, 1779);
    new Wall(this, "horizontal", 3).setPosition(2602, 1429);
    new Wall(this, "vertical", 5).setPosition(3458, 309);
    new Wall(this, "vertical", 2).setPosition(2741, 979);
    new Wall(this, "horizontal", 2).setPosition(3000, 1242);
    new Wall(this, "horizontal", 2).setPosition(2920, 1052);
    new Wall(this, "horizontal", 2).setPosition(2840, 732);

    new Wall(this, "vertical", 2).setPosition(3141, 179);
    new Wall(this, "horizontal", 1).setPosition(2962, 555);
    new Wall(this, "vertical", 2).setPosition(2785, 279);
    new Wall(this, "vertical", 3).setPosition(2485, 579);
    new Wall(this, "horizontal", 2).setPosition(2212, 305);
    new Wall(this, "vertical", 2).setPosition(1965, 173);
    new Wall(this, "vertical", 3).setPosition(1555, 443);
    new Wall(this, "horizontal", 3).setPosition(730, 203);
    new Wall(this, "vertical", 2).setPosition(1267, 380);
    new Wall(this, "horizontal", 3).setPosition(830, 953);
    new Wall(this, "horizontal", 3).setPosition(380, 353);
  }

  addMapBackground() {
    this.mapBackground = this.add.container(0, 0).setDepth(-10);

    let x = 0;
    let y = 0;

    for (let i = 0; i < 35; i++) {
      const ground = this.add
        .image(x, y, "floor")
        .setTint(0x3c608f)
        .setDepth(-10)
        .setOrigin(0);
      this.mapBackground.add(ground);

      x += ground.displayWidth;

      if (i === 6 || i === 13 || i === 20 || i === 27) {
        x = 0;
        y += ground.displayHeight;
      }
    }
  }

  update() {
    if (this.updateProcess === false) return;
    this.updateCameraZoom();
  }

  updateCameraZoom() {
    if (
      this.player.body.velocity.x !== 0 ||
      this.player.body.velocity.y !== 0
    ) {
      if (this.cameraZoom > 0.9) {
        this.cameraZoom -= 0.003;
      }
    } else {
      if (this.cameraZoom < 1) {
        this.cameraZoom += 0.005;
      }
    }

    this.cameras.main.setZoom(this.cameraZoom);
  }

  setCameraSettings() {
    this.cameras.main.startFollow(this.player, false, 0.09, 0.09);
  }
}
