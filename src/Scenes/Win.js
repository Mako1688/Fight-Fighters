class Win extends Phaser.Scene {
    constructor() {
        super('winScene')
    }

    init(data) {
        this.p1Wins = data.p1Wins
        this.p2Wins = data.p2Wins
        this.p1Rumble = data.p1Rumble
        this.p1Karate = data.p1Karate
        this.p2Rumble = data.p2Rumble
        this.p2Karate = data.p2Karate

    }

    preload() {
        
    }

    create() {
        this.scene.stop('pauseScene')
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

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        EnterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        
        

        //winner conditionals
        if(this.p1Wins == 2 && this.p1Rumble){
            this.rumble = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'rumble_win', 0).setScale(6)
            this.rumble.play('r_win')
            // Create a graphics object for boxes
            this.topBar = this.add.graphics()
            this.topBar.fillStyle(0x000000, 1)
            this.topBar.fillRect(0, 0, game.config.width, game.config.height / 5)

            // Create a graphics object for the health bar
            this.bottomBar = this.add.graphics()
            this.bottomBar.fillStyle(0x000000)
            this.bottomBar.fillRect(0, game.config.height - game.config.height / 5, game.config.width, game.config.height / 5)
            this.winnerText = this.add.text(game.config.width /2, game.config.height - 65, 'WINNERS DON\'T LOSE!', menuConfig).setOrigin(0.5, 0.5)
            this.add.text(game.config.width/2, game.config.height / 5 - 50, 'P1 WINS', menuConfig).setOrigin(0.5, 0.5)
        } else if(this.p1Wins == 2 && this.p1Karate){
            this.karate = this.add.sprite(game.config.width / 2, game.config.height / 2 + 170, 'karate_win', 0).setScale(6)
            this.karate.play('k_win')
            // Create a graphics object for boxes
            this.topBar = this.add.graphics()
            this.topBar.fillStyle(0x000000, 1)
            this.topBar.fillRect(0, 0, game.config.width, game.config.height / 5)

            // Create a graphics object for the health bar
            this.bottomBar = this.add.graphics()
            this.bottomBar.fillStyle(0x000000)
            this.bottomBar.fillRect(0, game.config.height - game.config.height / 5, game.config.width, game.config.height / 5)
            this.winnerText = this.add.text(game.config.width /2, game.config.height - 65, 'HHNNGHHHH !!!!!', menuConfig).setOrigin(0.5, 0.5)
            this.add.text(game.config.width/2, game.config.height / 5 - 50, 'P1 WINS', menuConfig).setOrigin(0.5, 0.5)
        } else if(this.p2Wins == 2 && this.p2Rumble){
            this.rumble = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'rumble_win', 0).setScale(6)
            this.rumble.play('r_win')
            // Create a graphics object for boxes
            this.topBar = this.add.graphics()
            this.topBar.fillStyle(0x000000, 1)
            this.topBar.fillRect(0, 0, game.config.width, game.config.height / 5)

            // Create a graphics object for the health bar
            this.bottomBar = this.add.graphics()
            this.bottomBar.fillStyle(0x000000)
            this.bottomBar.fillRect(0, game.config.height - game.config.height / 5, game.config.width, game.config.height / 5)
            this.winnerText = this.add.text(game.config.width /2, game.config.height - 65, 'WINNERS DON\'T LOSE!', menuConfig).setOrigin(0.5, 0.5)
            this.add.text(game.config.width/2, game.config.height / 5 - 50, 'P2 WINS', menuConfig).setOrigin(0.5, 0.5)
        } else if(this.p2Wins == 2 && this.p2Karate){
            this.karate = this.add.sprite(game.config.width / 2, game.config.height / 2 + 170, 'karate_win', 0).setScale(6)
            this.karate.play('k_win')
            // Create a graphics object for boxes
            this.topBar = this.add.graphics()
            this.topBar.fillStyle(0x000000, 1)
            this.topBar.fillRect(0, 0, game.config.width, game.config.height / 5)

            // Create a graphics object for the health bar
            this.bottomBar = this.add.graphics()
            this.bottomBar.fillStyle(0x000000)
            this.bottomBar.fillRect(0, game.config.height - game.config.height / 5, game.config.width, game.config.height / 5)
            this.winnerText = this.add.text(game.config.width /2, game.config.height - 65, 'HHNNGHHHH !!!!!', menuConfig).setOrigin(0.5, 0.5)
            this.add.text(game.config.width/2, game.config.height / 5 - 50, 'P2 WINS', menuConfig).setOrigin(0.5, 0.5)
        }
        
        
        

        this.time.delayedCall(5000, () => {
            //destroy win text
            this.winnerText.destroy()

            //restart game text
            this.add.text(game.config.width /2, game.config.height - 85, 'SPACE Button to PLAY AGAIN', menuConfig).setOrigin(0.5, 0.5)

            //credits text
            this.add.text(game.config.width /2, game.config.height - 50, 'ENTER Button For CREDITS', menuConfig).setOrigin(0.5, 0.5)
            
        }, null, this)
        
    }

    update() {
        //check if backspace pressed
        if (Phaser.Input.Keyboard.JustDown(EnterKey)) {
            this.scene.stop('audioScene')
            this.scene.start('creditsScene', {
                sceneKey: 'titleScene'
            })
            
        }

        //press any key to play
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('select')
            this.input.keyboard.enabled = false
            this.scene.stop('audioScene')
            this.explosion = this.add.sprite(0, 0, 'explosion', 32).setScale(5, 6.2).setOrigin(0, 0)
            //play shitty explosion animation
            this.explosion.anims.play('explode', true)
            this.explosion.on('animationcomplete', () => {    //callback after anim completes
                this.input.keyboard.enabled = true
                this.scene.start('selectScene')
            })
            
        }

    }
}