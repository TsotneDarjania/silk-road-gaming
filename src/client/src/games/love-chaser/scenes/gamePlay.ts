import { Player } from './../characters/player';

export class GamePlay extends Phaser.Scene {
    player!: Player
    cameraZoom = 1

    constructor () {
        super("GamePlay");
    }

    create() {
        this.addBackground()
        this.player = new Player(this, this.game.canvas.width / 2, this.game.canvas.width / 2, "boyCharacter")
        this.setCameraSettings()
    }

    addBackground () {
        this.add.image(0, 0, "map").setOrigin(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height)
    }

    setCameraSettings() {
        // this.cameras.main.setBounds(-Infinity, -500, Infinity, 2100);
        this.cameras.main.startFollow( this.player, false, 0.09, 0.09);
        this.player.on("startMotion", () => {
            this.cameras.main.setZoom(this.cameraZoom)
            if(this.cameraZoom > 0.9) {
                this.cameraZoom -= 0.01
            }
        }) 
        this.player.on("stopMotion", () => {
            this.cameras.main.setZoom(this.cameraZoom)
            this.cameraZoom = 1
        })
    }
}