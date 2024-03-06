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

        this.borderPadding = 50

        BackspaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE)

        //add background for pause
        this.healthBarBackground = this.add.graphics()
        this.healthBarBackground.fillStyle(0x000000, 0.5)
        this.healthBarBackground.fillRect(0, 0, game.config.width, game.config.height)

        //add any button to start text
        // Menu config
        let menuConfig = {
            fontFamily: 'PressStart2P',
            fontSize: '24px',
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
        menuConfig.fontSize = '16px'
        menuConfig.align = 'left'
        //add control text
        this.add.text(0 + this.borderPadding, 0 + this.borderPadding, 'Use:\nA and D\nS\nR\nF\nT\nS+T\nG', menuConfig).setOrigin(0, 0)
        this.add.text(120 + this.borderPadding, 0 + this.borderPadding, 'To do:\nMove ← or →\nCrouch\nPunch\nKick\nSpecial Move 1\nSpecial Move 2\nBlock', menuConfig).setOrigin(0, 0)
        menuConfig.align = 'right'
        this.add.text(game.config.width - this.borderPadding, 0 + this.borderPadding, 'Use:\n← and →\n↓\nL\n,\n;\n↓+;\n.', menuConfig).setOrigin(1, 0)
        this.add.text(game.config.width - this.borderPadding - 120, 0 + this.borderPadding, 'To do:\nMove ← or →\nCrouch\nPunch\nKick\nSpecial Move 1\nSpecial Move 2\nBlock', menuConfig).setOrigin(1, 0)

        //show sample combos
        menuConfig.align = 'center'
        menuConfig.fontSize = '18px'
        this.add.text(game.config.width / 2,  game.config.height / 2, 'Sample Combos:\nPunch x 2 + Special\nKick x 2 + Special \nPunch + Kick + Special', menuConfig).setOrigin(0.5, 0)

        //show Backspace to unpause

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(BackspaceKey)) {
            this.scene.moveDown('pauseScene')
            this.scene.resume('playScene')
            
        }
        

    }
}