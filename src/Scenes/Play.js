class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(data) {
        //recieve data from player slect
        this.p1Rumble = data.p1Rumble
        this.p1Karate = data.p1Karate
        this.p2Rumble = data.p2Rumble
        this.p2Karate = data.p2Karate

    }

    preload() {
        
    }

    create() {
        this.gameOver = false
        this.roundStarted = false
        // setup keyboard input
        // const left = scene.keys.AKey
        // const right = scene.keys.DKey
        // const down = scene.keys.SKey
        // const punch = scene.keys.RKey
        // const kick = scene.keys.FKey
        // const special = scene.keys.TKey
        // const block = scene.keys.GKey
        this.keys = this.input.keyboard.createCursorKeys()
        
        //player keys
        this.keys.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keys.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keys.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keys.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        this.keys.TKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T)
        this.keys.GKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)

        //player 2 keys
        // this.keys.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        // this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        


        this.roundCounter = 1
        //create backgorund
        this.background = this.add.sprite(0, 0, 'fightBachground').setOrigin(0, 0)

        let menuConfig = {
            fontFamily: 'PressStart2P',
            fontSize: '24px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }

        this.clockText = this.add.text(game.config.width / 2, 30, '99', menuConfig)

        //create ref

        //create players
        //bracket notation:
        //this[this.p1Rumble]
        this.player1 = new Player1(this, game.config.width / 4, game.config.height / 3 * 2, 'rumble_idle', 0).setOrigin(0.5, 0.5).setScale(2)
        //this.player2 = new Player2(this, game.config.width / 4 * 3, game.config.height / 4*3 + 50, 'karate_idle', 0).setOrigin(1, 1).setScale(2)

        


        //ready ... fight
        this.roundStart(this.roundCounter)


    }

    update() {
        this.player1FSM.step()
        //this.player2FSM.step()

        if (!this.gameOver && this.roundStarted == true) {  // Add a game over
            //display clock
            this.clockText.text = Math.trunc((99000 - (this.clock.getElapsed())) / 1000)
        }

    }

    roundStart(roundNum) {
        let menuConfig = {
            fontFamily: 'PressStart2P',
            fontSize: '24px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }
        
        if(roundNum == 1){
            //display round 1 text
            this.round = this.add.sprite(game.config.width / 2, game.config.height / 2, 'Round01')

        }else if(roundNum == 2){
            //display round2 text
            this.round = this.add.sprite(game.config.width / 2, game.config.height / 2, 'Round02')

        }else if(roundNum == 3){
            //display round 3 text
            this.round = this.add.sprite(game.config.width / 2, game.config.height / 2, 'Round03')
        }

        this.time.delayedCall(2500 , ()=> {
            //destroy round text
            this.round.destroy()

            //place fight text
            this.fightText = this.add.sprite(game.config.width / 2, game.config.height / 2, 'fight')
            this.time.delayedCall(1500 , ()=> {
                this.fightText.destroy()
                this.roundStarted = true
                //99-second play clock
                this.clock = this.time.delayedCall(99000, () => {
                    this.gameOver = true
                }, null, this)
                this.clockText = this.add.text(game.config.width / 2, 30, (this.clock.getElapsed() / 100), menuConfig)
                
    
            })

            //play ref animation

            //enable controls
            

            //define p1 keys
            // p1Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
            // p1Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
            // p1Down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
            // p1Punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
            // p1Kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
            // p1Special = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T)
            // p1Block = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)

            // //define p2 keys
            // p2Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
            // p2Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
            // p2Down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
            // p2Punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
            // p2Kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA)
            // p2Special = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON)
            // p2Block = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD)

        })

    }
}