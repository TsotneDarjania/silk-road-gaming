import Matter from "matter-js";
import { Car } from "../gameObjects/car";
import { MapBackground } from "../gameObjects/mapBackground";
import { Road } from "../gameObjects/road";

import roadJson from "../data/roadData.json";
import buildsData from "../data/buildsData.json";
import flowersData from "../data/flowersData.json";
import monetsData from "../data/monetsData.json";
import {
  MapInformationIconData,
  mapInformationIconsData,
} from "../data/mapInformationIconData";
import bombsData from "../data/bombsData.json";
import saveZonesData from "../data/saveZonesData.json";
import starsData from "../data/starsData.json";
import musicIconsData from "../data/musicIconsData.json";
import angelsData from "../data/angelsData.json";
import russianSoldiersData from "../data/russianSoldiers.json";
import monstersData from "../data/monstersData.json";
import evilFacesData from "../data/evilFacesData.json";

import { GameMenu } from "../ui/menu/gameMenu";
import { Angel } from "../gameObjects/angel";
import { Demon } from "../gameObjects/demon";
import { GameManager } from "../gameManager";
import { MapInformationIcon } from "../gameObjects/mapInformationIcon";
import { BonFire } from "../gameObjects/bonFire";
import MusicPlayer from "../musicPlayer";
import { Monet } from "../gameObjects/monet";
import { Flower } from "../gameObjects/flower";
import { SaveZone } from "../gameObjects/saveZone";
import { Stars } from "../gameObjects/stars";
import { MusicIcon } from "../gameObjects/musicIcon";
import { GovermentStation } from "../gameObjects/govermentStation";
import {
  AngelsData,
  BombsData,
  EvilFaceData,
  MonsterData,
  MusicIconsData,
  RussianSoldierData,
  SaveZonesData,
  StarsData,
} from "../config/interfaces";
import { Bomb } from "../gameObjects/bomb";
import RussianTank from "../gameObjects/russianTank";
import { RussianSoldier } from "../gameObjects/russialSoldier";
import { Rail } from "../gameObjects/rail";
import { Train } from "../gameObjects/train";
import { OptimizationManager } from "../optimizationManager";
import { Monster } from "../gameObjects/monster";
import { EvilFace } from "../gameObjects/evilFace";
import { DamageRoads } from "../gameObjects/damageRoads";
import { screenSize } from "../config/getScreenSize";
import { Menu } from "./menu";

export class GamePlay extends Phaser.Scene {
  gameMenu!: GameMenu;

  // GameObjects
  car!: Car;
  train!: Train;

  // Camera
  camera_z_index: number = screenSize().gamePlay.camera.camera_z_index;
  min_zoom: number = screenSize().gamePlay.camera.min_zoom;

  max_zoom: number = screenSize().gamePlay.camera.max_zoom;
  zoom_factor: number = 0.001;
  followOffsetX = 260;

  tbilisi!: MapBackground;
  roadToGori!: MapBackground;
  rikoti!: MapBackground;

  //ui
  menu!: GameMenu;

  gameManager!: GameManager;
  optimizationManager!: OptimizationManager;

  musicPlayer!: MusicPlayer;

  stopUpdateProcess = false;

  roads: Array<Road> = [];
  stars: Array<Stars> = [];
  bombs: Array<Bomb> = [];
  flowers: Array<Flower> = [];
  monets: Array<Monet> = [];
  mapInformationIcons: Array<MapInformationIcon> = [];
  rails: Array<Rail> = [];
  angels: Array<Angel> = [];
  russianSoldiers: Array<RussianSoldier> = [];
  monsters: Array<Monster> = [];
  evilFaces: Array<EvilFace> = [];
  damageRoad!: DamageRoads;

  buttonSound!: Phaser.Sound.BaseSound;
  applause!: Phaser.Sound.BaseSound;
  russianSoldierDeadScream!: Phaser.Sound.BaseSound;
  bodyFail!: Phaser.Sound.BaseSound;
  carEngine!: Phaser.Sound.BaseSound;
  wolfSound!: Phaser.Sound.BaseSound;

  russianTank!: RussianTank;

  //@ts-ignore
  IOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);

  constructor() {
    super("GamePlay");
  }

  isIOS() {
    return this.IOS ? true : false;
  }

  create() {
    // const menuScene = this.scene.get("Menu") as Menu;

    // setTimeout(() => {
    //   menuScene.scale.removeAllListeners();
    // }, 3000);
    this.scale.startFullscreen();

    this.createSpriteSheetAnimations();
    this.addSoundEffects();

    this.gameMenu = this.scene.get("GameMenu") as GameMenu;

    this.gameManager = new GameManager(this);
    this.musicPlayer = new MusicPlayer(this);

    new GovermentStation(this, -118680, 1120);

    this.addRussianSoldiers();

    this.russianTank = new RussianTank(this, -130700, 1100);

    this.addBombs();
    this.addStars();
    this.addMusicMapIcons();
    this.addSaveZones();
    this.addAngels();

    new Demon(this, -46800, 290, [
      "This game is crap.",
      "Let's get the hell out of here",
    ]);

    new Demon(this, -108000, 830, [
      "Fool, I have a surprise",
      "for you on the way",
    ]);

    this.addRoads();
    this.addFlowers();

    this.train = new Train(this, -157920, 1108);
    this.addRails();

    new BonFire(this, -58100, 1230, 900, 700);
    new BonFire(this, -60400, 1340, 900, 700);
    new BonFire(this, -63400, 1340, 900, 700);
    new BonFire(this, -66000, 1380, 900, 700);

    this.addMapInformationIcons();
    this.addMonets();

    this.tbilisi = new MapBackground(this, 0, 500, buildsData.tbilisi).setScale(
      0.7
    );
    this.roadToGori = new MapBackground(
      this,
      -800,
      0,
      buildsData.roadToGori
    ).setDepth(-100);

    this.rikoti = new MapBackground(this, -800, 0, buildsData.rikoti).setDepth(
      -110
    );

    this.setCameraSettings();

    this.optimizationManager = new OptimizationManager(this, this.gameManager);

    //Start UI Scene for Menu UI Elements
    this.scene.launch("GameMenu");
  }

  changeOrientationSize(canvasWidth: number, canvasHeight: number) {}

  addDamageRoad() {
    this.damageRoad = new DamageRoads(this, -337953, -1370);
  }

  addEvilFaces() {
    Object.values(evilFacesData).forEach((data: EvilFaceData) => {
      this.evilFaces.push(
        new EvilFace(
          this,
          data.x,
          data.y,
          data.animationDuration,
          data.animationPosY
        )
      );
    });
  }

  addMonsters() {
    Object.values(monstersData).forEach((data: MonsterData) => {
      this.monsters.push(new Monster(this, data.x, data.y, data.jumpStrong));
    });
  }

  addRussianSoldiers() {
    Object.values(russianSoldiersData).forEach((data: RussianSoldierData) => {
      this.russianSoldiers.push(new RussianSoldier(this, data.x, data.y));
    });
  }

  addRails() {
    let posX = 157040;
    for (let i = 0; i < 139; i++) {
      const rail = new Rail(this, -posX, 1304.5);
      this.rails.push(rail);
      posX += 754;
    }

    this.matter.add.rectangle(-206647, 1324.5, 110000, 40, {
      isStatic: true,
      slop: 0,
    });
  }

  addAngels() {
    Object.values(angelsData).forEach((data: AngelsData) => {
      this.angels.push(new Angel(this, data.x, data.y, data.text));
    });
  }

  addMusicMapIcons() {
    Object.values(musicIconsData).forEach((data: MusicIconsData) => {
      new MusicIcon(this, data.x, data.y, data.key, data.text, data.musicKey);
    });
  }

  addStars() {
    Object.values(starsData).forEach((data: StarsData) => {
      this.stars.push(new Stars(this, data.x, data.y, data.count));
    });
  }

  addBombs() {
    Object.values(bombsData).forEach((data: BombsData) => {
      this.bombs.push(new Bomb(this, data.x, data.y));
    });
  }

  addSaveZones() {
    Object.values(saveZonesData).forEach((data: SaveZonesData) => {
      new SaveZone(this, data.x, data.y, data.icon, data.text, data.index);
    });
  }

  addMapInformationIcons() {
    Object.values(mapInformationIconsData).forEach(
      (data: MapInformationIconData) => {
        new MapInformationIcon(
          this,
          data.x,
          data.y,
          "map-information-icon",
          data.text
        );
      }
    );
  }

  addSoundEffects() {
    this.buttonSound = this.sound.add("buttonSound", {
      volume: 1,
    });
    this.applause = this.sound.add("applauseSound", {
      volume: 1,
    });
    this.bodyFail = this.sound.add("bodyFail", {
      volume: 1,
    });
    this.carEngine = this.sound.add("carEngine", {
      volume: 2,
      loop: true,
      rate: 0.01,
    });
    this.wolfSound = this.sound.add("wolfSound", {
      volume: 1,
    });
  }

  addRoads() {
    Object.keys(roadJson).forEach((regionKey) => {
      //@ts-ignore
      Object.keys(roadJson[regionKey]).forEach((key) => {
        // console.log("regionKey is : " + regionKey + " key is : " + key);
        //@ts-ignore
        const road = new Road(this, roadJson[regionKey][key]);
        this.roads.push(road);
      });
    });

    // new Road(this, roadJson.rikoti[4]);
  }

  addFlowers() {
    Object.keys(flowersData).forEach((key) => {
      this.flowers.push(
        new Flower(
          this,
          //@ts-ignore
          flowersData[key].x,
          //@ts-ignore
          flowersData[key].y,
          //@ts-ignore
          flowersData[key].key,
          //@ts-ignore
          flowersData[key].scale
        )
      );
    });
  }

  addMonets() {
    Object.keys(monetsData).forEach((key) => {
      this.monets.push(
        new Monet(
          this,
          //@ts-ignore
          monetsData[key].x,
          //@ts-ignore
          monetsData[key].y,
          //@ts-ignore
          monetsData[key].key,
          //@ts-ignore
          monetsData[key].value,
          this.gameMenu
        )
      );
    });
  }

  resetCamera(duration: number) {
    this.cameras.main.fadeOut(duration);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      setTimeout(() => {
        this.cameras.main.fadeIn(1500);
      }, 1000);
    });

    this.cameras.main.once("camerafadeincomplete", () => {
      this.gameManager.cameraResetFinish();
    });
  }

  pauseScene() {
    this.scene.pause();
    this.car.isAcceleratingLeft = false;
    this.car.isAcceleratingRight = false;
    this.car.isMoving = false;
  }

  continueScene() {
    this.scene.resume();

    this.car.isAcceleratingLeft = false;
    this.car.isAcceleratingRight = false;
    this.car.isMoving = false;
  }

  update() {
    if (this.stopUpdateProcess === false) {
      this.addCameraZoomEffects();

      const followOffset = new Phaser.Math.Vector2(this.followOffsetX, 120);
      this.cameras.main.setFollowOffset(followOffset.x, followOffset.y);
    }
  }

  setCameraSettings() {
    this.cameras.main.setBounds(-Infinity, -500, Infinity, 2100);
    this.cameras.main.startFollow(this.car.carBody, false, 0.1, 0.08);
    this.cameras.main.setZoom(this.camera_z_index);
  }

  addCameraZoomEffects() {
    // Check if car is moving
    if (this.car.isMoving === false) {
      // Zoom in
      if (this.camera_z_index < this.max_zoom) {
        this.camera_z_index += this.zoom_factor;
        this.followOffsetX -= 0.1;
        this.cameras.main.setZoom(this.camera_z_index);
      }
    } else {
      // Zoom out
      if (this.camera_z_index > this.min_zoom) {
        this.camera_z_index -= this.zoom_factor;
        this.followOffsetX += 0.1;
        this.cameras.main.setZoom(this.camera_z_index);
      }
    }
  }

  createSpriteSheetAnimations() {
    this.anims.create({
      key: "bonfire_idle",
      frameRate: 13,
      frames: this.anims.generateFrameNumbers("bonfire", {
        start: 0,
        end: 53,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "asteroid_idle",
      frameRate: 27,
      frames: this.anims.generateFrameNumbers("asteroid", {
        start: 0,
        end: 69,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "car_explotion",
      frameRate: 24,
      frames: this.anims.generateFrameNumbers("carExplosion", {
        start: 0,
        end: 63,
      }),
    });
  }
}
