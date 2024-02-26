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
        this.roundCounter = 1
        //create backgorund
        this.background = this.add.sprite(0, 0, 'fightBachground').setOrigin(0, 0)

        //create health bars

        //create ref

        //create players
        this.player1 = 

        //ready ... fight
        this.roundStart(this.roundCounter)


    }

    update() {
        

    }

    roundStart(roundNum) {
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
            })

            //play ref animation

            //enable controls
            //define p1 keys
            p1Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
            p1Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
            p1Down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
            p1Punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
            p1Kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
            p1Special = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T)
            p1Block = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)

            //define p2 keys
            p2Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
            p2Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
            p2Down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
            p2Punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
            p2Kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA)
            p2Special = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON)
            p2Block = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD)


            

        })

    }
}