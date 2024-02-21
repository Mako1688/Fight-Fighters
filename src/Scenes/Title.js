class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    init() {

    }

    preload() {
        
    }

    create() {
        this.title = this.add.sprite(game.config.width/2, game.config.height/2, 'fight')
    }

    update() {

    }
}