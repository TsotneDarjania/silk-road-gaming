export class LoadingScreen extends Phaser.GameObjects.Container {
  fillIndicator!: Phaser.GameObjects.Image;
  loadingText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBackground();
    this.addLoadingText();
    // this.addBrandTitle();

    this.addLoadingBar();
  }

  addLoadingText() {
    this.loadingText = this.scene.add
      .text(
        this.scene.game.canvas.width / 2,
        this.scene.game.canvas.height / 2 - 70,
        "0%",
        {
          align: "center",
          fontFamily: "mainFont",
          color: "#FFE40A",
          fontSize: "30px",
        }
      )
      .setOrigin(0.5);
  }

  addLoadingBar() {
    const container = this.scene.add.container(
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2
    );
    const backImage = this.scene.add
      .image(0, 0, "white")
      .setDisplaySize(1000, 40)
      .setTint(0x262326);

    this.fillIndicator = this.scene.add
      .image(-500, 0, "white")
      .setOrigin(0, 0.5)
      .setDisplaySize(0, 40)
      .setTint(0xffd20a);

    container.add(backImage);
    container.add(this.fillIndicator);
  }

  updateFillIndicator(width: number) {
    this.fillIndicator.setDisplaySize(width * 1000, 40);
    this.loadingText.setText(`${(width * 100).toFixed(0)}%`);
  }

  addBrandTitle() {
    this.scene.add
      .text(
        this.scene.game.canvas.width / 2,
        this.scene.game.canvas.height / 2,
        "Silk Road Gaming",
        {
          align: "center",
          fontFamily: "mainFont",
          color: "#FFE40A",
          fontSize: "40px",
        }
      )
      .setOrigin(0.5);
  }

  addBackground() {
    const backgroundImage = this.scene.add
      .image(0, 0, "white")
      .setDisplaySize(
        this.scene.game.canvas.width,
        this.scene.game.canvas.height
      )
      .setOrigin(0)
      .setTint(0x010c12);

    this.add(backgroundImage);
  }
}
