class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    init() {

    }

    preload() {
        this.load.image('fight', './assets/Sprites/Fight Sprite240x40.png')
        this.load.image('KO', './assets/Sprites/KO100x40.png')
        this.load.image('Round01', './assets/Sprites/Round01,240x40.png')
        this.load.image('Round02', './assets/Sprites/Round02,240x40.png')
        this.load.image('Round03', './assets/Sprites/Round03,240x40.png')
        
    }

    create() {
        
    }

    update() {
        this.scene.start('titleScene')
    }
}