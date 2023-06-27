import { Scene } from "phaser";
import { gameZonesData } from "./data/gameZones";
import { Asteroid } from "./gameObjects/asteroid";
import { Car } from "./gameObjects/car";
import { Rock } from "./gameObjects/rock";
import { getRandomFloat } from "./helper/tatukaMath";
import { GamePlay } from "./scenes/gamePlay";
import { GameMenu } from "./ui/menu/gameMenu";
import { gameConfig } from "./config/gameConfig";

interface SaveZoneData {
  carPositions: {
    x: number;
    y: number;
  };
}

const showScreenTexts: Record<number, { title: string; text: string }> = {
  1: {
    title: "BATUMISKEN",
    text: "Tbilisi Section",
  },
  2: {
    title: "Mission Complete",
    text: "Road to Gori",
  },
  3: {
    title: "Rikoti Section",
    text: "New Stage",
  },
};

export class GameManager {
  gamePlay!: GamePlay;
  gameMenu!: GameMenu;
  carBody!: Phaser.GameObjects.Sprite;

  canRadioChange: boolean = false;

  saveZonesData: Array<SaveZoneData> = [];
  saveZoneIndex = gameConfig.saveZoneIndex;
  //saveZoneIndex = 5;

  backgroundImage!: Phaser.GameObjects.Image;

  asteroids: Array<Asteroid> = [];
  skyRocks: Array<Rock> = [];

  isSkyRocksAlreadyFalling = false;
  wolfsSoundsUpdate!: NodeJS.Timeout;

  constructor(public scene: Phaser.Scene) {
    this.gamePlay = scene as GamePlay;
    this.init();
  }

  init() {
    this.gameMenu = this.gamePlay.scene.get("GameMenu") as GameMenu;
    //Initial Car Indicators
    if (this.saveZoneIndex > 0) {
      this.gameMenu.radioIsAccess = true;
      this.gameMenu.moneyIsaccess = true;
    }

    this.saveZonesData = [
      {
        carPositions: {
          x: -100,
          y: 386,
        },
      },
      {
        carPositions: {
          x: -40200,
          y: 770,
        },
      },
      {
        carPositions: {
          x: -73900,
          y: 1180,
        },
      },
      {
        carPositions: {
          x: -100500,
          y: 970,
        },
      },
      {
        carPositions: {
          x: -110090,
          y: 1040,
        },
      },
      {
        carPositions: {
          x: -129000,
          y: 730,
        },
      },
      {
        carPositions: {
          x: -154000,
          y: 1150,
        },
      },
      {
        carPositions: {
          x: -264000,
          y: 990,
        },
      },
      {
        carPositions: {
          x: -282000,
          y: 350,
        },
      },
      {
        carPositions: {
          x: -310010,
          y: 480,
          // x: -355010,
          // y: 480,
        },
      },
      {
        carPositions: {
          x: -370010,
          y: 850,
        },
      },
    ];

    if (this.gamePlay.sceneIsStart) {
      this.initCar();
    }
    this.createGameZones();
    this.createBackgroundImage();
    this.createAsteroids();
    this.createSkyRocks();
  }

  initCar() {
    this.gamePlay.car = new Car(
      this.gamePlay,
      this.saveZonesData[this.saveZoneIndex].carPositions.x,
      this.saveZonesData[this.saveZoneIndex].carPositions.y
    );
    this.carBody = this.gamePlay.car.carBody;
  }

  saveGame(index: number) {
    this.saveZoneIndex = index;
  }

  createBackgroundImage() {
    console.log(
      this.gamePlay.game.canvas.width,
      this.gamePlay.game.canvas.height
    );
    this.backgroundImage = this.gamePlay.add
      .image(-3000, -3000, "white")
      .setDisplaySize(6000, 6000)
      .setScrollFactor(0, 0)
      .setDepth(-200)
      .setOrigin(0)
      .setTint(0xff3c52)
      .setAlpha(0);
  }

  loose(reason: string) {
    if (reason === "upsideDown") {
      this.replay();
    }
    if (reason === "fireExplotion") {
      this.replay();
    }
  }

  replay() {
    this.gamePlay.resetCamera(400);
    this.gameMenu.stopUpdateProcess = true;
    this.gameMenu.gameIndicatorsContainer.setVisible(false);
    this.stopFallingAsteroids();

    //time when camera is dark
    setTimeout(() => {
      this.gamePlay.car.resetCar(
        this.saveZonesData[this.saveZoneIndex].carPositions.x,
        this.saveZonesData[this.saveZoneIndex].carPositions.y
      );
    }, 400);

    setTimeout(() => {
      this.gamePlay.car.carBody.setStatic(false);
      this.gamePlay.car.addBags();
    }, 500);
  }

  cameraResetFinish() {
    this.gameMenu.gameIndicatorsContainer.setVisible(true);
    this.gameMenu.openAccessIndicators();
    this.gameMenu.stopUpdateProcess = false;
    this.gamePlay.russianTank.canMotion = false;
    this.gamePlay.russianTank.reset();
  }

  emptyFunction() {}

  createGameZones() {
    const zoneCallBackFunctions: Record<
      number,
      { enter: Function; exit: Function }
    > = {
      1: {
        enter: () => {
          this.gamePlay.musicPlayer.playSpecialSong(0);
          this.showScreenText(1);
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      2: {
        enter: () => {
          this.openRadio();
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      3: {
        enter: () => {
          this.openMoney();
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      4: {
        enter: () => {
          this.gameMenu.radioOff();
          this.startFallingAsteroids();
          this.changeColorToGameBackground(0x730d31, 1, 9000);
        },
        exit: () => {
          this.stopFallingAsteroids();
          this.changeColorToGameBackground(0x730d31, 0, 9000);
        },
      },
      5: {
        enter: () => {
          if (this.gamePlay.musicPlayer.specialSongs[1].isPlaying === false) {
            this.gamePlay.musicPlayer.stopAllSong();
          }
          this.gamePlay.musicPlayer.playSpecialSong(1);
          this.gameMenu.radioOnn();
          this.showScreenText(2);
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      6: {
        enter: () => {
          this.startFallingRocks();
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      7: {
        enter: () => {
          this.gamePlay.russianTank.canMotion = true;
          if (this.gamePlay.musicPlayer.specialSongs[2].isPlaying === false) {
            this.gamePlay.musicPlayer.stopAllSong();
          }
          this.gamePlay.musicPlayer.playSpecialSong(2);
          this.gameMenu.radioOff();
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      8: {
        enter: () => {
          this.gamePlay.russianTank.canMotion = false;
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      9: {
        enter: () => {
          this.showScreenText(3);
          if (this.gamePlay.musicPlayer.specialSongs[2].isPlaying === false) {
            this.gamePlay.musicPlayer.stopAllSong();
          }
          this.gamePlay.musicPlayer.playSpecialSong(2);
          this.gameMenu.radioOff();
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      10: {
        enter: () => {
          this.gamePlay.train.stopMotion();
          this.stopTrainMotion();
          this.gamePlay.musicPlayer.snoozeRussianSong();
          this.gamePlay.car.withCarSound = true;
          setTimeout(() => {
            this.gamePlay.wolfSound.play();
          }, 7000);

          this.changeColorToGameBackground(0x1a181c, 1, 9000);
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      11: {
        enter: () => {
          this.stopWolfSounds();
          if (
            this.gamePlay.damageRoad === null ||
            this.gamePlay.damageRoad === undefined
          ) {
            this.gamePlay.addDamageRoad();
          } else {
            this.gamePlay.damageRoad.collider.setVisible(true);
            this.gamePlay.damageRoad.collider.setPosition(-337953, -1370);
          }
          this.changeColorToGameBackground(0x1a181c, 0, 9000);
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      12: {
        enter: () => {
          this.gamePlay.car.canMoving = false;
          this.gamePlay.car.stopUpdateProcess = true;
          this.gameMenu.mobileUIButtons.forEach((button) => {
            button.setVisible(false);
          });
          this.gamePlay.applause.play();
          this.gameMenu.speedometer.setVisible(false);
          this.gameMenu.speedometerArrow.setVisible(false);
          this.gameMenu.gameIndicatorsContainer.setVisible(false);
          this.gameMenu.menuButton.setVisible(false);
          this.gameMenu.addWinModal();
        },
        exit: () => {
          this.emptyFunction();
        },
      },
    };

    Object.values(gameZonesData).forEach((data) => {
      new GameZone(
        this.gamePlay,
        data.x,
        data.y,
        data.width,
        data.height,
        zoneCallBackFunctions[data.id].enter,
        zoneCallBackFunctions[data.id].exit
      );
    });
  }

  showScreenText(index: number) {
    this.gameMenu.showScreenTexts(
      showScreenTexts[index].title,
      showScreenTexts[index].text
    );
  }

  openRadio() {
    this.gameMenu.radioIsAccess = true;
  }

  openMoney() {
    this.gameMenu.moneyIsaccess = true;
  }

  changeColorToGameBackground(color: number, alpha: number, duration: number) {
    this.backgroundImage.setTint(color);

    this.gamePlay.tweens.add({
      targets: this.backgroundImage,
      duration: duration,
      alpha: alpha,
    });
  }

  createAsteroids() {
    for (let i = 0; i < 2; i++) {
      this.asteroids.push(
        new Asteroid(
          this.gamePlay,
          this.carBody.x - 700 + getRandomFloat(0, 1400),
          -700
        )
      );
    }
  }

  createSkyRocks() {
    for (let i = 0; i < 20; i++) {
      const rock = new Rock(
        this.gamePlay,
        -108700 + getRandomFloat(-400, 0),
        getRandomFloat(-300, -900)
      );
      rock.rockImage.setStatic(true);
      this.skyRocks.push(rock);
    }
  }

  startFallingRocks() {
    if (this.isSkyRocksAlreadyFalling) return;
    this.skyRocks.forEach((rock) => {
      console.log("skyrokks");
      rock.rockImage.setStatic(false);
    });
    this.isSkyRocksAlreadyFalling = true;
  }

  startFallingAsteroids() {
    this.asteroids.forEach((asteroid) => {
      asteroid.startFalling();
    });
  }

  stopFallingAsteroids() {
    this.asteroids.forEach((asteroid) => {
      asteroid.stopFalling();
    });
  }

  startTrainMotion() {
    this.gamePlay.car.stopUpdateProcess = true;
    this.gamePlay.car.carBody.setVelocity(0, 0);
    this.gamePlay.car.carBody.applyForce(new Phaser.Math.Vector2(0, 0));

    this.gameMenu.speedometerContainer.setVisible(false);
  }

  stopTrainMotion() {
    this.gamePlay.car.stopUpdateProcess = false;
    this.gamePlay.car.carBody.setVelocity(0, 0);
    this.gamePlay.car.carBody.applyForce(new Phaser.Math.Vector2(0, 0));

    this.gameMenu.speedometerContainer.setVisible(true);
  }

  playWolfsSounds() {
    let time = getRandomFloat(7000, 13000);
    this.wolfsSoundsUpdate = setTimeout(() => {
      if (this.gamePlay.wolfSound.isPlaying === false) {
        this.gamePlay.wolfSound.play();
      }
      this.playWolfsSounds();
    }, time);
  }

  stopWolfSounds() {
    this.gamePlay.wolfSound.stop();
    clearInterval(this.wolfsSoundsUpdate);
  }
}

class GameZone {
  collisionEnter!: any;
  collisionExit!: any;
  zone!: any;

  isInside = false;

  constructor(
    public scene: Phaser.Scene,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    collisionEnter: any,
    collisionExit: any
  ) {
    // use arrow function to bind the `this` context correctly
    this.collisionEnter = collisionEnter;
    this.collisionExit = collisionExit;

    this.init();
  }

  init() {
    this.zone = this.scene.matter.add.rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      {
        isStatic: false,
        ignoreGravity: true,
        collisionFilter: {
          category: 0x0001,
          mask: 0x0002,
        },
        isSensor: true,
      }
    );

    this.addCollisionTrigger();
  }

  addCollisionTrigger() {
    this.scene.matter.world.on(
      Phaser.Physics.Matter.Events.COLLISION_START,
      (event: any) => {
        event.pairs.forEach((pair: any) => {
          if (pair.bodyB === this.zone) {
            if (this.isInside === false) {
              this.collisionEnter();
              this.isInside = true;
            }
          }
        });
      }
    );

    this.scene.matter.world.on(
      Phaser.Physics.Matter.Events.COLLISION_END,
      (event: any) => {
        event.pairs.forEach((pair: any) => {
          if (pair.bodyB === this.zone) {
            if (this.isInside === true) {
              this.collisionExit();
              this.isInside = false;
            }
          }
        });
      }
    );
  }
}
