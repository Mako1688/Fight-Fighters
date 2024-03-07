class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    init(data) {
        //recieve data about which scene transitioned from
        this.sceneFrom = data.scene

    }

    preload() {
        
    }

    create() {
        EnterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        // Menu config
        let menuConfig = {
            fontFamily: 'PressStart2P',
            fontSize: '26px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }
        //show players text and pause text
        this.add.text(game.config.width / 2, game.config.height / 2, 'Credits:\nCoding: Marco Ogaz-Vega\n\nSprites: Marco Ogaz-Vega,\nLois <3,\nPaul Robertson\n(Gravity Falls Sprite Animator)\n\nAudio: Marco Ogaz-Vega,\nBrad Breeck\n(Gravity Falls Musician)\n\nStateMachine: Nathan \n\nENTER to Return', menuConfig).setOrigin(0.5, 0.5)
        
        
    }

    update() {
        //check if backspace pressed
        //check if came from titleScene
        if(this.sceneFrom == 'titleScene'){
            if (Phaser.Input.Keyboard.JustDown(EnterKey)) {
                this.scene.start('titleScene')
                this.scene.stop('creditsScene')
                
            }
        }



    }
}