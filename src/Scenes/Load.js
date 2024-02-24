class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    init() {

    }

    preload() {
        //load images
        this.load.image('fight', './assets/Sprites/Fight Sprite240x40.png')
        this.load.image('KO', './assets/Sprites/KO100x40.png')
        this.load.image('Round01', './assets/Sprites/Round01,240x40.png')
        this.load.image('Round02', './assets/Sprites/Round02,240x40.png')
        this.load.image('Round03', './assets/Sprites/Round03,240x40.png')
        this.load.image('worldmap', './assets/Sprites/worldmap.png')
        this.load.image('jpn flag', './assets/Sprites/Japan Flag.png')
        this.load.image('usa flag', './assets/Sprites/America Flag.png')
        this.load.image('characters_select', './assets/Sprites/Characters.png')
        this.load.image('title_background', './assets/Sprites/title.png')
        this.load.image('Karate Portrait', './assets/Sprites/Karate Portrait.png')
        this.load.image('Karate Name', './assets/Sprites/Karate Name.png')
        this.load.image('Rumble Portrait', './assets/Sprites/Rumble Portrait.png')
        this.load.image('Rumble Name', './assets/Sprites/Rumble Name.png')
        this.load.image('airplane', './assets/Sprites/Airplane.png')

        //load spritesheets
        this.load.spritesheet('p1_cursor_sheet', './assets/SpriteSheets/p1 cursor sheet.png', {
            frameWidth: 70,
            frameHeight: 100,
            startFrame:  0,
            endFrames: 1
        })
        this.load.spritesheet('p2_cursor_sheet', './assets/SpriteSheets/p2 cursor sheet.png', {
            frameWidth: 70,
            frameHeight: 100,
            startFrame:  0,
            endFrames: 1
        })
        
    }

    create() {
        //create animations
        this.anims.create({
            key: 'p1_cursor_flash',
            
            frames: this.anims.generateFrameNumbers('p1_cursor_sheet', { 
                start: 0, 
                end: 1, 
                first: 0
            }),
            frameRate: 2
        })
        
        this.anims.create({
            key: 'p2_cursor_flash',
            
            frames: this.anims.generateFrameNumbers('p2_cursor_sheet', { 
                start: 0, 
                end: 1, 
                first: 0
            }),
            frameRate: 2
        })
        
    }

    update() {
        this.scene.start('titleScene')
    }
}