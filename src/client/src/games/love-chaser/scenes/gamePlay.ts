import { getCookie, setCookie } from "../../../helper/cookie";
import { myAbly } from "../services/ably";
import Wall from "../gameObjects/wall";
import { Player } from "./../characters/player";
import { GameManager } from "../core/gameManager";
import { OnlinePlayer } from "../characters/onlinePlayer";
import { GamePlayInterface } from "./gameplayInterface";
import { MapKey } from "../gameObjects/mapKey";
import { Door } from "../gameObjects/door";

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

    this.setCameraSettings();
    this.addColliderDetectinos();

    this.updateProcess = true;
  }

  addColliderDetectinos() {
    this.physics.add.collider(this.player, this.assets, () => {});
    this.physics.add.collider(this.player, this.bricks, () => {});
  }

  addAssets() {
    const box_1 = this.physics.add
      .image(100, 210, "box-1")
      .setImmovable(true)
      .setDisplaySize(70, 70);
    this.assets.push(box_1);

    this.add.image(200, 20, "bookshelf");

    const box_2 = this.physics.add
      .image(100, 140, "box-1")
      .setImmovable(true)
      .setDisplaySize(70, 70);
    this.assets.push(box_2);

    const bed = this.physics.add
      .image(1400, 300, "bed")
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

    this.add.image(1590, 1820, "stage").setScale(0.7).setTint(0x082c4d);
  }

  addKeys() {
    const door_1 = new Door(this, 1015, 2500);
    const key_1 = new MapKey(this, 1100, 2300, door_1);

    const door_2 = new Door(this, 1013, 1590);
    const key_2 = new MapKey(this, 1100, 1690, door_2);
  }

  createMap() {
    this.addMapBackground();

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
