import { getRandomFloat } from "../helper/tatukaMath";

export class Stars {
  stars: Array<Phaser.GameObjects.Image> = [];

  constructor(
    public scene: Phaser.Scene,
    public x: number,
    y: number,
    public number: number
  ) {
    for (let i = 0; i < this.number; i++) {
      const star = this.scene.add
        .image(
          x + getRandomFloat(-600, 600),
          y + getRandomFloat(-500, 500),
          "star"
        )
        .setScale(0.05)
        .setScrollFactor(0.04, 1)
        .setDepth(-150);

      this.scene.tweens.add({
        targets: star,
        scale: getRandomFloat(0.05, 0.1),
        duration: getRandomFloat(600, 1500),
        yoyo: true,
        repeat: -1,
      });

      this.stars.push(star);
    }
  }
}
