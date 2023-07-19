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
import { Border, HideZone, mapConfig } from "../config/mapConfig";

export class GamePlay extends Phaser.Scene {
  player!: Player;
  onlinePlayer!: OnlinePlayer;

  interface!: GamePlayInterface;

  cameraZoom = 1;
  bricks: Array<Phaser.Physics.Arcade.Image> = [];

  mapBackground!: Phaser.GameObjects.Container;
  assets: Array<Phaser.Physics.Arcade.Image> = [];
  doors: Array<Door> = [];
  hearts: Array<GamePlayHeart> = [];

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
    this.addClubLights();
    this.addHearts();

    this.setCameraSettings();
    this.addColliderDetectinos();

    this.updateProcess = true;
  }

  addHearts() {
    let id = 0;
    Object.values(mapConfig.hearts).forEach((heart) => {
      const gamePlayHeart = new GamePlayHeart(this, heart.x, heart.y, id);
      this.hearts.push(gamePlayHeart);
      id += 1;
    });
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

  addDoors() {
    let id = 0;
    Object.values(mapConfig.doors).forEach((doorConfig) => {
      const door = new Door(this, doorConfig.door.x, doorConfig.door.y, id);
      new MapKey(this, doorConfig.doorKey.x, doorConfig.doorKey.y, door);
      this.doors.push(door);
      id += 1;
    });
  }

  createMap() {
    this.addMapBackground();

    //add hide Zones
    Object.values(mapConfig.hideZones).forEach((zone: HideZone) => {
      this.add
        .image(zone.x, zone.y, "default-image")
        .setTint(0x43de71)
        .setDisplaySize(zone.width, zone.height)
        .setDepth(400);
    });

    //add Borders
    Object.values(mapConfig.borders).forEach((border: Border) => {
      new Wall(this, border.direction, border.quantity).setPosition(
        border.x,
        border.y
      );
    });
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
}
