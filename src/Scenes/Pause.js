class Pause extends Phaser.Scene {
    constructor() {
        super('pauseScene')
    }

    init() {

    }

    preload() {
        
    }

    create() {
        console.log('started Pause scene')

        BackspaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE)
        
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(BackspaceKey)){
            this.scene.resume('playScene')
            this.scene.stop('pauseScene')
        }
        

    }
}