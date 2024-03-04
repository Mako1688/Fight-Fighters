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
        this.roundCounter = data.roundCounter
        this.p1Wins = data.p1Wins
        this.p2Wins = data.p2Wins

    }

    preload() {
        
    }

    create() {
        if(this.p1Wins == 2 || this.p2Wins == 2) {
            this.scene.start('winScene', {
                p1Wins: this.p1Wins,
                p2Wins: this.p2Wins
            })
        }
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
        this.keys.LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.keys.RightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.keys.DownKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        this.keys.LKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        this.keys.CommaKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA)
        this.keys.ColonKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON)
        this.keys.PeriodKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD)
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

        this.clockText = this.add.text(game.config.width / 2, 30, '99', menuConfig).setOrigin(0.5)

        //create ref

        //create players
        //bracket notation:
        //this[this.p1Rumble]
        this.player1 = new Player1(this, game.config.width / 4, game.config.height / 5 * 4, 'rumble_idle', 0).setOrigin(0.5, 1).setScale(2)
        this.player2 = new Player2(this, game.config.width / 4 * 3, game.config.height / 5 * 4, 'rumble_idle', 0).setOrigin(0.5, 1).setScale(2).setFlipX(true)

        
        this.p1activeHitboxes = []
        this.p2activeHitboxes = []

        this.physics.add.collider(this.player1, this.player2)

        //ready ... fight
        this.roundStart(this.roundCounter)


    }

    update() {
        this.player1FSM.step()
        this.player2FSM.step()
        
        // Check for hitbox collisions with the target player
        this.physics.world.collide(this.p1activeHitboxes, this.player2, this.handleHitboxCollision, null, this)
        this.physics.world.collide(this.p2activeHitboxes, this.player1, this.handleHitboxCollision, null, this)

        if (this.fireball && this.player2) {
            this.physics.world.overlap(this.fireball, this.player2, this.handleHitboxCollision, null, this);
        }
        
        if (this.fireball2 && this.player1) {
            this.physics.world.overlap(this.fireball2, this.player1, this.handleHitboxCollision, null, this);
        }

        if(this.player1.currentHealth == 0){
            this.p2Wins += 1
            this.gameOver = true
        }

        if(this.player2.currentHealth == 0){
            this.p1Wins += 1
            this.gameOver = true
        }


        if (!this.gameOver && this.roundStarted == true) {
            // Add a game over display clock
            this.clockText.text = Math.trunc((99000 - (this.clock.getElapsed())) / 1000)
        }

        if(this.gameOver == true){
            this.roundCounter+= 1
            this.scene.restart({
                p1Karate: this.p1Karate,
                p1Rumble: this.p1Rumble,
                p2Karate: this.p2Karate,
                p2Rumble: this.p2Rumble,
                roundCounter: this.roundCounter,
                p1Wins: this.p1Wins,
                p2Wins: this.p2Wins
            })
        }
    }

    handleHitboxCollision(hitbox, target) {
        // Check if the hitbox has already registered a hit
        if (!hitbox.hasHit) {
            // Perform your collision logic here
            console.log("Valid Collision detected!")
            if(target == this.player1){
                this.player1FSM.transition('hurt')
            }

            if(target == this.player2){
                this.player2FSM.transition('hurt')
            }

            // Example: Decrease target player's health
            target.decreaseHealth(3) // Adjust the amount as needed

            // Set the flag to indicate that the hitbox has hit
            hitbox.hasHit = true

            // Additional logic based on your requirements
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
                this.clockText = this.add.text(game.config.width / 2, 30, (this.clock.getElapsed() / 100), menuConfig).setOrigin(0.5)
                
    
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