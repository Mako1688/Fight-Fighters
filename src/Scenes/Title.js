class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    init() {

    }

    preload() {
        
    }

    create() {
        //add background image
        
        this.title = this.add.sprite(game.config.width/2, game.config.height/3, 'title', 0)
        

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)    

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
        this.add.text(game.config.width/2, game.config.height/4*3, 'PRESS SPACE BUTTON TO START', menuConfig).setOrigin(0.5, 0.5)
    }

    update() {
        this.title.anims.play('jiggle', true)
        //press any key to play
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.explosion = this.add.sprite(0, 0, 'explosion', 32).setScale(5, 6.2).setOrigin(0, 0)
            //play shitty explosion animation
            this.explosion.anims.play('explode', true)
            this.explosion.on('animationcomplete', () => {    //callback after anim completes
                this.scene.start('selectScene')
            })
            
        }

    }
}