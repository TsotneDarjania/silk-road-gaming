import { getCookie, setCookie } from "../../../helper/cookie";
import { myAbly } from "../utils/ably";
import Wall from "../gameObjects/wall";
import { Player } from "./../characters/player";
import { GameManager } from "../utils/gameManager";

export class GamePlay extends Phaser.Scene {
  player!: Player;
  onlinePlayer!: Player;

  cameraZoom = 1;

  background!: Phaser.GameObjects.Container;
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
      key: "down-idle",
      frameRate: 7,
      frames: this.anims.generateFrameNumbers("down-idle", {
        start: 0,
        end: 1,
      }),
      repeat: -1,
    });
  }

  create() {
    this.background = this.add.container(0, 0);
    this.addBackground();

    this.gameManager = new GameManager(this);

    // if (this.ably.userName === "admin") {
    //   setInterval(() => {
    //     this.ably.sendData(
    //       this.player.x.toString(),
    //       this.player.y.toString(),
    //       this.player.direction
    //     );
    //   }, 100);
    // }

    // if (this.ably.userName !== "admin")
    //   setInterval(() => {
    //     //this.player.setPosition(Number(this.ably.x), Number(this.ably.y));
    //   }, 500);
  }

  startGame() {
    new Wall(this, "horizontal", 19).setPosition(20, 0);
    new Wall(this, "vertical", 13).setPosition(0, 20);
    new Wall(this, "horizontal", 19).setPosition(20, 1385);
    new Wall(this, "vertical", 13).setPosition(2080, 20);

    new Wall(this, "horizontal", 5).setPosition(20, 300);
    new Wall(this, "vertical", 7).setPosition(300, 390);

    this.setCameraSettings();

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

    this.add.image(200, 20, "bookshelf");

    this.physics.add.collider(this.player, this.assets, () => {});

    this.updateProcess = true;
  }

  update() {
    if (this.updateProcess) {
      this.updateCameraZoom();
    }

    // console.log(this.ably.x, this.ably.y);
    // if (this.ably.userName !== "admin") {
    //   this.player.direction = this.ably.direction;
    // }

    // this.ably.sendData(this.player.x.toString());
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

  addBackground() {
    let x = 0;
    let y = 0;

    for (let i = 0; i < 16; i++) {
      const ground = this.add.image(x, y, "ground").setOrigin(0);
      this.background.add(ground);

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
