import { getCookie, setCookie } from "../../../helper/cookie";
import { myAbly } from "../services/ably";
import Wall from "../gameObjects/wall";
import { Player } from "./../characters/player";
import { GameManager } from "../core/gameManager";
import { OnlinePlayer } from "../characters/onlinePlayer";
import { GamePlayInterface } from "./gameplayInterface";

export class GamePlay extends Phaser.Scene {
  player!: Player;
  onlinePlayer!: OnlinePlayer;

  interface!: GamePlayInterface;

  cameraZoom = 1;

  mapBackground!: Phaser.GameObjects.Container;
  assets: Array<Phaser.Physics.Arcade.Image> = [];

  gameManager!: GameManager;

  ably!: myAbly;

  updateProcess = false;

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

    this.setCameraSettings();
    this.addColliderDetectinos();

    this.updateProcess = true;
  }

  addColliderDetectinos() {
    this.physics.add.collider(this.player, this.assets, () => {});
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
  }

  createMap() {
    this.addMapBackground();
    new Wall(this, "horizontal", 19).setPosition(20, 0);
    new Wall(this, "vertical", 13).setPosition(0, 20);
    new Wall(this, "horizontal", 19).setPosition(20, 1385);
    new Wall(this, "vertical", 13).setPosition(2080, 20);

    new Wall(this, "horizontal", 5).setPosition(20, 300);
    new Wall(this, "vertical", 7).setPosition(300, 390);
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

  addMapBackground() {
    this.mapBackground = this.add.container(0, 0);

    let x = 0;
    let y = 0;

    for (let i = 0; i < 16; i++) {
      const ground = this.add.image(x, y, "ground").setOrigin(0);
      this.mapBackground.add(ground);

      x += 500;

      if (i === 3 || i === 7 || i === 11) {
        x = 0;
        y += 350;
      }
    }
  }

  setCameraSettings() {
    // this.cameras.main.setBounds(-Infinity, -500, Infinity, 2100);
    this.cameras.main.startFollow(this.player, false, 0.09, 0.09);
  }
}
