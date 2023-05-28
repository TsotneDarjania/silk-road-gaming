import { GamePlay } from "../scenes/gamePlay";

export class SaveZone {
  traparet!: Phaser.GameObjects.Image;

  isSaved = false;

  constructor(
    public scene: GamePlay,
    public x: number,
    public y: number,
    public key: string,
    public title: Array<string>,
    public saveZoneIndex: number
  ) {
    this.title = title;

    this.init();
  }

  init() {
    this.addTraparet();
    this.addTitle();
    this.addZone();
  }

  addTraparet() {
    const traparet = this.scene.add
      .image(this.x, this.y, this.key)
      .setScale(0.7);
  }

  addTitle() {
    const title = this.scene.add
      .text(this.x + 10, this.y - 95, this.title, {
        fontFamily: "mainFont",
        fontSize: "17px",
        color: "#301C1A",
        align: "center",
      })
      .setShadow(0, 0, "#301C1A", 4)
      .setOrigin(0.5);
  }

  addZone() {
    // add Dead Zone
    const zone = this.scene.matter.add.rectangle(this.x, 0, 300, 4200, {
      ignoreGravity: true,
      collisionFilter: {
        category: 0x0001,
        mask: 0x0002,
      },
      isSensor: true,
    });

    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (pair.bodyB === zone) {
          this.scene.gameMenu.radioOnn();
          if (this.saveZoneIndex > 6) {
            this.scene.gameMenu.radioOff();
            if (this.isSaved === false) {
              this.scene.car.withCarSound = true;
              this.scene.gameManager.playWolfsSounds();
              this.scene.gameManager.changeColorToGameBackground(
                0x1a181c,
                1,
                9000
              );
              this.isSaved = true;
            }
          }
          //Check if this save zonealready access
          if (this.saveZoneIndex <= this.scene.gameManager.saveZoneIndex)
            return;

          //Save Data
          this.scene.optimizationManager.checkGameZone(this.saveZoneIndex);
          this.scene.applause.play();
          this.scene.gameManager.saveGame(this.saveZoneIndex);
          this.scene.gameMenu.showScreenTexts(
            "Game Saved",
            "Bravo, your awesomeness knows no bounds!"
          );
        }
      });
    });
  }
}
