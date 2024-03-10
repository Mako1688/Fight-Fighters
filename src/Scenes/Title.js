class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    init() {

    }

    preload() {
        
    }

    create() {
        //stop all sound
        this.sound.stopAll()
        //play audio
        this.intro = this.sound.add('intro')
        
        //add background image
        this.title = this.add.sprite(game.config.width/2, game.config.height/3, 'title', 0)
        

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        BackspaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE) 
        EnterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        //add any button to start text
        // Menu config
        let menuConfig = {
            fontFamily: 'PressStart2P',
            fontSize: '30px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }
        this.add.text(game.config.width/2, game.config.height/4*3, 'SPACE Button To START\nBACKSPACE Button For CONTROLS\nENTER Button For CREDITS', menuConfig).setOrigin(0.5, 0.5)
    }

    update() {
        if(!(this.intro.isPlaying)){
            this.intro.play()
        }
        this.title.anims.play('jiggle', true)
        //press any key to play
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('select')
            this.input.keyboard.enabled = false
            this.explosion = this.add.sprite(0, 0, 'explosion', 32).setScale(5, 6.2).setOrigin(0, 0)
            //play shitty explosion animation
            this.explosion.anims.play('explode', true)
            this.explosion.on('animationcomplete', () => {    //callback after anim completes
                this.intro.stop()
                this.input.keyboard.enabled = true
                this.scene.start('selectScene')
            })
            
        }

        //check if backspace pressed
        if (Phaser.Input.Keyboard.JustDown(BackspaceKey)) {
            this.scene.start('pauseScene', {
                sceneKey: 'titleScene'
            })
            
        }

        //check if backspace pressed
        if (Phaser.Input.Keyboard.JustDown(EnterKey)) {
            this.scene.start('creditsScene', {
                sceneKey: 'titleScene'
            })
            
        }

    }
}