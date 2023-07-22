import { GamePlay } from "../scenes/gamePlay";
import { GamePlayInterface } from "../scenes/gameplayInterface";
import { Door } from "./door";

export class MapKey extends Phaser.Physics.Arcade.Image {
  gamePlayInterface!: GamePlayInterface;

  constructor(public scene: GamePlay, x: number, y: number, public door: Door) {
    super(scene, x, y, "key");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setImmovable(true);
    this.setScale(0.3);

    this.gamePlayInterface = this.scene.scene.get(
      "GamePlayInterface"
    ) as GamePlayInterface;

    this.addCollisionDetection();
  }

  addCollisionDetection() {
    let isOverlap = false;
    this.scene.events.on("update", () => {
      if (this.scene.physics.world.overlap(this.scene.player, this)) {
        isOverlap = true;
        this.gamePlayInterface.canPressEnter = true;
        this.scene.currentDoor = this.door;
        this.door.isOpen
          ? this.gamePlayInterface.closeDoorButton.setVisible(true)
          : this.gamePlayInterface.openDoorButton.setVisible(true);
      } else {
        if (isOverlap) {
          isOverlap = false;
          this.gamePlayInterface.canPressEnter = false;
          this.gamePlayInterface.closeDoorButton.setVisible(false);
          this.gamePlayInterface.openDoorButton.setVisible(false);
        }
      }
    });
  }

  clickOpenButton() {}

  clickCloseButton() {}
}
