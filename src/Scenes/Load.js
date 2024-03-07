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
        this.load.image('fightBachground', './assets/Sprites/fightFightersBackground.png')
        this.load.image('particle', './assets/Sprites/Cross.png')

        //load audio
        this.load.audio('intro', './assets/Sounds/intro.mp3')
        this.load.audio('character_select_song', './assets/Sounds/Character Select.mp3')
        this.load.audio('select', './assets/Sounds/select.wav')
        this.load.audio('hit', './assets/Sounds/Hit.wav')
        this.load.audio('switch', './assets/Sounds/Switch.wav')

        //load spritesheets
        this.load.spritesheet('explosion', './assets/SpriteSheets/Fist Explosion.png', {
            frameWidth: 184,
            frameHeight: 104,
            startFrame:  0,
            endFrames: 32
        })

        this.load.spritesheet('title', './assets/SpriteSheets/Title_Sheet.png', {
            frameWidth: 800,
            frameHeight: 513,
            startFrame:  0,
            endFrames: 24
        })

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

        //load Rumble Spritesheets
        this.load.spritesheet('rumble_idle', './assets/SpriteSheets/Rumble_Idle.png', {
            frameWidth: 104,
            frameHeight: 120,
            startFrame:  0,
            endFrames: 13
        })

        this.load.spritesheet('rumble_punch', './assets/SpriteSheets/Rumble_Punch.png', {
            frameWidth: 140,
            frameHeight: 120,
            startFrame:  0,
            endFrames: 6
        })

        this.load.spritesheet('rumble_down_punch', './assets/SpriteSheets/Rumble_DownPunch.png', {
            frameWidth: 125,
            frameHeight: 145,
            startFrame:  0,
            endFrames: 6
        })

        this.load.spritesheet('rumble_walk', './assets/SpriteSheets/Rumble_Walk.png', {
            frameWidth: 110,
            frameHeight: 130,
            startFrame:  0,
            endFrames: 7
        })

        this.load.spritesheet('rumble_down_kick', './assets/SpriteSheets/Rumble_Down_Kick.png', {
            frameWidth: 150,
            frameHeight: 145,
            startFrame:  0,
            endFrames: 18
        })

        this.load.spritesheet('rumble_kick', './assets/SpriteSheets/Rumble_Kick.png', {
            frameWidth: 150,
            frameHeight: 135,
            startFrame:  0,
            endFrames: 7
        })

        this.load.spritesheet('rumble_special', './assets/SpriteSheets/Rumble_Special.png', {
            frameWidth: 130,
            frameHeight: 120,
            startFrame:  0,
            endFrames: 9
        })

        this.load.spritesheet('fireball', './assets/SpriteSheets/Fireball.png', {
            frameWidth: 140,
            frameHeight: 100,
            startFrame:  0,
            endFrames: 4
        })

        this.load.spritesheet('rumble_down_special', './assets/SpriteSheets/Rumble_Special2.png', {
            frameWidth: 80,
            frameHeight: 150,
            startFrame:  0,
            endFrames: 5
        })

        this.load.spritesheet('rumble_hurt', './assets/SpriteSheets/Rumble_Hurt.png', {
            frameWidth: 104,
            frameHeight: 115,
            startFrame:  0,
            endFrames: 6
        })

        this.load.spritesheet('rumble_crouch', './assets/SpriteSheets/Rumble_Crouch.png', {
            frameWidth: 80,
            frameHeight: 108,
            startFrame:  0,
            endFrames: 1
        })

        this.load.spritesheet('rumble_block', './assets/SpriteSheets/Rumble_Block.png', {
            frameWidth: 80,
            frameHeight: 120,
            startFrame:  0,
            endFrames: 2
        })

        

        //load Dr Karate Sprite sheets
        this.load.spritesheet('karate_idle', './assets/SpriteSheets/Karate_Idle.png', {
            frameWidth: 136,
            frameHeight: 144,
            startFrame:  0,
            endFrames: 5
        })

        this.load.spritesheet('karate_punch', './assets/SpriteSheets/Karate_Punch.png', {
            frameWidth: 184,
            frameHeight: 152,
            startFrame:  0,
            endFrames: 6
        })

        this.load.spritesheet('karate_kick', './assets/SpriteSheets/Karate_Kick.png', {
            frameWidth: 200,
            frameHeight: 144,
            startFrame:  0,
            endFrames: 8
        })
        
        this.load.spritesheet('karate_walk', './assets/SpriteSheets/Karate_Walk.png', {
            frameWidth: 137,
            frameHeight: 152,
            startFrame:  0,
            endFrames: 5
        })
        
    }

    create() {
        //create animations
        this.anims.create({
            key: 'explode',
            
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 32, 
                first: 0
            }),
            frameRate: 12
        })

        this.anims.create({
            key: 'jiggle',
            
            frames: this.anims.generateFrameNumbers('title', { 
                start: 0, 
                end: 24, 
                first: 0
            }),
            frameRate: 12
        })

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

        //create rumble animations
        this.anims.create({
            key: 'r_idle',
            frames: this.anims.generateFrameNumbers('rumble_idle', { 
                start: 0, 
                end: 13, 
                first: 0
            }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: 'r_punch',
            frames: this.anims.generateFrameNumbers('rumble_punch', { 
                start: 0, 
                end: 6, 
                first: 0
            }),
            frameRate: 12
        })

        this.anims.create({
            key: 'r_down_punch',
            frames: this.anims.generateFrameNumbers('rumble_down_punch', { 
                start: 0, 
                end: 6, 
                first: 0
            }),
            frameRate: 12
        })

        this.anims.create({
            key: 'r_walk',
            frames: this.anims.generateFrameNumbers('rumble_walk', { 
                start: 0, 
                end: 7, 
                first: 0
            }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: 'r_down_kick',
            frames: this.anims.generateFrameNumbers('rumble_down_kick', { 
                start: 0, 
                end: 18, 
                first: 0
            }),
            frameRate: 12,
        })

        this.anims.create({
            key: 'r_kick',
            frames: this.anims.generateFrameNumbers('rumble_kick', { 
                start: 0, 
                end: 7, 
                first: 0
            }),
            frameRate: 12,
        })

        this.anims.create({
            key: 'r_special',
            frames: this.anims.generateFrameNumbers('rumble_special', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 12,
        })

        this.anims.create({
            key: 'fireball_anim',
            frames: this.anims.generateFrameNumbers('fireball', { 
                start: 0, 
                end: 4, 
                first: 0
            }),
            repeat: -1,
            frameRate: 12,
        })

        this.anims.create({
            key: 'r_down_special',
            frames: this.anims.generateFrameNumbers('rumble_down_special', { 
                start: 0, 
                end: 5, 
                first: 0
            }),
            frameRate: 12,
        })

        this.anims.create({
            key: 'r_hurt',
            frames: this.anims.generateFrameNumbers('rumble_hurt', { 
                start: 4, 
                end: 0, 
                first: 4
            }),
            frameRate: 12,
        })

        this.anims.create({
            key: 'r_crouch',
            frames: this.anims.generateFrameNumbers('rumble_crouch', { 
                start: 0, 
                end: 1, 
                first: 0
            }),
            frameRate: 12,
        })

        this.anims.create({
            key: 'r_block',
            frames: this.anims.generateFrameNumbers('rumble_block', { 
                start: 0, 
                end: 2, 
                first: 0
            }),
            frameRate: 12,
        })
        

        //create Dr Karate animations
        this.anims.create({
            key: 'k_idle',
            frames: this.anims.generateFrameNumbers('karate_idle', { 
                start: 0, 
                end: 5, 
                first: 0
            }),
            frameRate: 12
        })

        this.anims.create({
            key: 'k_punch',
            frames: this.anims.generateFrameNumbers('karate_punch', { 
                start: 0, 
                end: 6, 
                first: 0
            }),
            frameRate: 12
        })

        this.anims.create({
            key: 'k_kick',
            frames: this.anims.generateFrameNumbers('karate_kick', { 
                start: 0, 
                end: 8, 
                first: 0
            }),
            frameRate: 12
        })

        this.anims.create({
            key: 'k_walk',
            frames: this.anims.generateFrameNumbers('karate_walk', { 
                start: 0, 
                end: 5, 
                first: 0
            }),
            frameRate: 12
        })
    }

    update() {
        this.scene.start('titleScene')
    }
}