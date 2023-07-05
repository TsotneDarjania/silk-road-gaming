export class Player extends Phaser.Physics.Arcade.Image{
    speed = 130;
    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)
        scene.physics.add.existing(this)
        scene.add.existing(this)

        this.init()
    }

    init() {
        this.setDisplaySize(100, 100)
        this.addController()
    }

    addController() {
        this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (key: any) => {
            if(key.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT || key.keyCode === Phaser.Input.Keyboard.KeyCodes.A){
                this.setVelocityX(-this.speed)
                this.emit("startMotion")
            } 
            if(key.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT || key.keyCode === Phaser.Input.Keyboard.KeyCodes.D){
                this.setVelocityX(this.speed)
                this.emit("startMotion")
            }
            if(key.keyCode === Phaser.Input.Keyboard.KeyCodes.UP || key.keyCode === Phaser.Input.Keyboard.KeyCodes.W){
                this.setVelocityY(-this.speed)
                this.emit("startMotion")
            }
            if(key.keyCode === Phaser.Input.Keyboard.KeyCodes.DOWN || key.keyCode === Phaser.Input.Keyboard.KeyCodes.S){
                this.setVelocityY(this.speed)
                this.emit("startMotion")
            }
        });
        this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_UP, () => {
            this.setVelocity(0, 0)
            this.emit("stopMotion")
        })
    }
}