import { calculatePercentage } from "../../../tbilisi-batumi-1/helper/tatukaMath";
import { GameData } from "../../core/gameData";
import { Menu } from "../../scenes/menu";

export class CharacterOptions extends Phaser.GameObjects.Container {
  animation!: Phaser.Tweens.Tween;

  constructor(public scene: Menu, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setVisible(false);
    this.setScale(0);

    this.addTitle();
    this.addBoyCharacterButton();
    this.addGirlCharacterButton();

    this.setPosition(
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2
    );
  }

  addTitle() {
    const title = this.scene.add
      .text(
        0,
        -calculatePercentage(12, this.scene.game.canvas.height),
        "Select Your Character",
        {
          align: "center",
          fontSize: "23px",
          color: "#65D7FF",
          fontFamily: "Bungee",
        }
      )
      .setOrigin(0.5);

    this.add(title);
  }

  addBoyCharacterButton() {
    const boyCharacter = this.scene.add
      .image(
        -calculatePercentage(4, this.scene.game.canvas.width),
        0,
        "boy-default"
      )
      .setInteractive({
        cursor: "pointer",
      })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        boyCharacter.setScale(1.2);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        boyCharacter.setScale(1);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.clickSound.play();
        this.scene.lobby.createRoom(GameData.username, "boy");
      });

    this.add(boyCharacter);
  }

  addGirlCharacterButton() {
    const girlCharacter = this.scene.add
      .image(
        calculatePercentage(4, this.scene.game.canvas.width),
        0,
        "girl-default"
      )
      .setInteractive({
        cursor: "pointer",
      })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        girlCharacter.setScale(1.2);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        girlCharacter.setScale(1);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.clickSound.play();
        this.scene.lobby.createRoom(GameData.username, "girl");
      });

    this.add(girlCharacter);
  }

  open() {
    if (this.animation !== undefined) this.animation.restart();

    this.setVisible(true);
    this.animation = this.scene.tweens.add({
      targets: this,
      duration: 1500,
      scale: 1,
      ease: Phaser.Math.Easing.Bounce.Out,
    });
  }
}
