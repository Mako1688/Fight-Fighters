class Pause extends Phaser.Scene {
    constructor() {
        super('pauseScene')
    }

    init(data) {
        //recieve data from player slect
        this.p1Rumble = data.p1Rumble
        this.p1Karate = data.p1Karate
        this.p2Rumble = data.p2Rumble
        this.p2Karate = data.p2Karate
        this.roundCounter = data.roundCounter
        this.p1Wins = data.p1Wins
        this.p2Wins = data.p2Wins
        //recieve data about which scene transitioned from
        this.sceneKey = data.sceneKey

    }

    preload() {
        
    }

    create() {
        this.sound.stopAll()
        console.log('started Pause scene')
        console.log(this.sceneKey)

        // Add a generic keyboard listener to check for any key press
        this.input.keyboard.on('keydown', function (event) {
            console.log('Key pressed:', event.key);
        })

        this.borderPadding = 50

        

        //add background for pause
        this.healthBarBackground = this.add.graphics()
        this.healthBarBackground.fillStyle(0x000000, 0.75)
        this.healthBarBackground.fillRect(0, 0, game.config.width, game.config.height)

        //add any button to start text
        // Menu config
        let menuConfig = {
            fontFamily: 'PressStart2P',
            fontSize: '26px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }
        //show players text and pause text
        this.add.text(0, 0, 'Player 1:', menuConfig).setOrigin(0, 0)
        this.add.text(game.config.width / 2, 0, 'PAUSE', menuConfig).setOrigin(0.5, 0)
        menuConfig.align = 'right'
        this.add.text(game.config.width, 0, 'Player 2:', menuConfig).setOrigin(1, 0)
        //adjust font size
        menuConfig.fontSize = '26px'
        menuConfig.align = 'left'
        //add control text
        this.add.text(0 + this.borderPadding, 0 + this.borderPadding, 'Use:\nA and D\nS\nR\nF\nT\nS+T\nG', menuConfig).setOrigin(0, 0)
        menuConfig.align = 'right'
        this.add.text(game.config.width - this.borderPadding, 0 + this.borderPadding, 'Use:\n← and →\n↓\nL\n,\n;\n↓+;\n.', menuConfig).setOrigin(1, 0)
        menuConfig.align = 'center'
        this.add.text(game.config.width / 2, 0 + this.borderPadding, 'To do:\nMove ← or →\nCrouch\nPunch\nKick\nSpecial Move 1\nSpecial Move 2\nBlock', menuConfig).setOrigin(0.5, 0)

        //show sample combos
        menuConfig.align = 'center'
        menuConfig.fontSize = '18px'
        this.add.text(game.config.width / 2,  game.config.height / 2, 'Sample Combos:\nPunch x 2 + Special\nKick x 2 + Special \nPunch + Kick + Special\nKick + Punch + Special', menuConfig).setOrigin(0.5, 0)

        //show Backspace to unpause
        menuConfig.fontSize = '24px'
       this.add.text(game.config.width /2, game.config.height / 4 * 3, 'BACKSPACE To RETURN', menuConfig).setOrigin(0.5, 0)

    }

    update() {
        BackspaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE)
        
        if (Phaser.Input.Keyboard.JustDown(BackspaceKey)) {
            console.log('Backspace key pressed')
            if (this.sceneKey === 'titleScene') {
                this.scene.start('titleScene')
            } else if (this.sceneKey === 'playScene') {
                this.scene.resume('playScene', {
                    p1Karate: this.p1Karate,
                    p1Rumble: this.p1Rumble,
                    p2Karate: this.p2Karate,
                    p2Rumble: this.p2Rumble,
                    roundCounter: this.roundCounter,
                    p1Wins: this.p1Wins,
                    p2Wins: this.p2Wins
                })
            }
            this.scene.stop('pauseScene')
        }
        

    }
}