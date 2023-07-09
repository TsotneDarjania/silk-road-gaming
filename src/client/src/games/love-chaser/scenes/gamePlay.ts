import { Player } from "./../characters/player";

export class GamePlay extends Phaser.Scene {
  player!: Player;
  cameraZoom = 1;

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
    this.addBackground();
    this.player = new Player(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.width / 2,
      "down-idle"
    );
    this.setCameraSettings();
  }

  update() {
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

  addBackground() {
    this.add.image(0, 0, "ground").setOrigin(0);
  }

  setCameraSettings() {
    // this.cameras.main.setBounds(-Infinity, -500, Infinity, 2100);
    this.cameras.main.startFollow(this.player, false, 0.09, 0.09);
  }
}
