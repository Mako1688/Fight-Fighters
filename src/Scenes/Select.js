class Select extends Phaser.Scene {
    constructor() {
        super('selectScene')
    }

    init() {

    }

    preload() {
        
    }

    create() {
        //place background
        this.background = this.add.sprite(0, 0, 'worldmap').setOrigin(0)

        //create airplane
        this.airplane = this.add.sprite(618, 225, 'airplane').setAlpha(0).setOrigin(0.5, 0.5).setScale(2)

        //place character slect
        this.select = this.add.sprite(game.config.width / 2, game.config.height / 4 * 3, 'characters_select')

        this.p1cursor = this.add.sprite(this.select.x - 35, this.select.y, 'p1_cursor_sheet', 0)
        this.p2cursor = this.add.sprite(this.select.x - 35, this.select.y, 'p2_cursor_sheet', 0)

        //set player 1 portrait
        this.p1portrait = this.add.sprite(game.config.width/ 5, game.config.height / 3 * 2, 'Rumble Portrait')
        this.p1name = this.add.sprite(this.p1portrait.x, this.p1portrait.y - 120, 'Rumble Name').setScale(5)
        this.p1flag = this.add.sprite(this.p1name.x, this.p1name.y - 100, 'usa flag')
        
        //set player 2 portrait
        this.p2portrait = this.add.sprite(game.config.width/ 5 * 4, game.config.height / 3 * 2, 'Rumble Portrait').setFlipX(true)
        this.p2name = this.add.sprite(this.p2portrait.x, this.p2portrait.y - 120, 'Rumble Name').setScale(5)
        this.p2flag = this.add.sprite(this.p2name.x, this.p2name.y - 100, 'usa flag')

        //define p1 keys
        p1Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        p1Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        p1Punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        p1Kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        p1Special = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T)
        p1Block = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)

        //define p2 keys
        p2Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        p2Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        p2Punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        p2Kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA)
        p2Special = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON)
        p2Block = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD)

        //set charcater selection bools
        this.p1Rumble = true
        this.p2Rumble = true
        this.p1Karate = false
        this.p2Karate = false

        //selection bools
        this.p1select = false
        this.p2select = false

    }

    update() {
        //play animations
        this.p1cursor.anims.play('p1_cursor_flash', true)
        this.p2cursor.anims.play('p2_cursor_flash', true)

        //set p1 character portrait bools
        if(this.p1Rumble == true && this.p1Karate == false) {
            this.p1portrait.setTexture('Rumble Portrait').setFlipX(false)
            this.p1name.setTexture('Rumble Name').setScale(5)
            this.p1flag.setTexture('usa flag')
        } else if (this.p1Karate == true && this.p1Rumble == false) {
            this.p1portrait.setTexture('Karate Portrait').setFlipX(true)
            this.p1name.setTexture('Karate Name').setScale(5)
            this.p1flag.setTexture('jpn flag')
        }

        //set p2 character bools
        if(this.p2Rumble == true && this.p2Karate == false) {
            this.p2portrait.setTexture('Rumble Portrait').setFlipX(true)
            this.p2name.setTexture('Rumble Name').setScale(5)
            this.p2flag.setTexture('usa flag')
        } else if (this.p2Karate == true && this.p2Rumble == false) {
            this.p2portrait.setTexture('Karate Portrait').setFlipX(false)
            this.p2name.setTexture('Karate Name').setScale(5)
            this.p2flag.setTexture('jpn flag')
        }

        
        // Handle player 1 left key on rumble
        if (p1Left.isDown && this.p1LeftReleased && this.p1Rumble == true) {
            this.p1LeftReleased = false
            this.p1Karate = true
            this.p1Rumble = false
            this.p1cursor.x = this.select.x + 35
        } else if (p1Left.isUp) {
            this.p1LeftReleased = true
        }

        // Handle player 1 right key on rumble
        if (p1Right.isDown && this.p1RightReleased && this.p1Rumble == true) {
            this.p1RightReleased = false
            this.p1Karate = true
            this.p1Rumble = false
            this.p1cursor.x = this.select.x + 35
        } else if (p1Right.isUp) {
            this.p1RightReleased = true
        }

        // Handle player 1 left key on karate
        if (p1Left.isDown && this.p1LeftReleased && this.p1Karate == true) {
            this.p1LeftReleased = false
            this.p1Rumble = true
            this.p1Karate = false
            this.p1cursor.x = this.select.x - 35
        } else if (p1Left.isUp) {
            this.p1LeftReleased = true
        }

        // Handle player 1 right key on karate
        if (p1Right.isDown && this.p1RightReleased && this.p1Karate == true) {
            this.p1RightReleased = false
            this.p1Karate = false
            this.p1Rumble = true
            this.p1cursor.x = this.select.x - 35
        } else if (p1Right.isUp) {
            this.p1RightReleased = true
        }

        // Handle player 2 left key on rumble
        if (p2Left.isDown && this.p2LeftReleased && this.p2Rumble == true) {
            this.p2LeftReleased = false
            this.p2Karate = true
            this.p2Rumble = false
            this.p2cursor.x = this.select.x + 35
        } else if (p2Left.isUp) {
            this.p2LeftReleased = true
        }

        // Handle player 2 right key on rumble
        if (p2Right.isDown && this.p2RightReleased && this.p2Rumble == true) {
            this.p2RightReleased = false
            this.p2Karate = true
            this.p2Rumble = false
            this.p2cursor.x = this.select.x + 35
        } else if (p2Right.isUp) {
            this.p2RightReleased = true
        }

        // Handle player 2 left key on karate
        if (p2Left.isDown && this.p2LeftReleased && this.p2Karate == true) {
            this.p2LeftReleased = false
            this.p2Rumble = true
            this.p2Karate = false
            this.p2cursor.x = this.select.x - 35
        } else if (p2Left.isUp) {
            this.p2LeftReleased = true
        }

        // Handle player 2 right key on karate
        if (p2Right.isDown && this.p2RightReleased && this.p2Karate == true) {
            this.p2RightReleased = false
            this.p2Rumble = true
            this.p2Karate = false
            this.p2cursor.x = this.select.x - 35
        } else if (p2Right.isUp) {
            this.p2RightReleased = true
        }


        if(p1Punch.isDown || p1Kick.isDown || p1Special.isDown || p1Block.isDown) {
            //play sound
            //disable movemonet
            p1Left.enabled = false
            p1Right.enabled = false
            p1Punch.enabled = false
            p1Kick.enabled = false
            p1Special.enabled = false
            p1Block.enabled = false
            this.p1select = true
        }

        if(p2Punch.isDown || p2Kick.isDown || p2Special.isDown || p2Block.isDown) {
            //play sound
            //disable movemonet
            p2Left.enabled = false
            p2Right.enabled = false
            p2Punch.enabled = false
            p2Kick.enabled = false
            p2Special.enabled = false
            p2Block.enabled = false


            this.p2select = true
        }

        if (this.p1select && this.p2select) {
            // Disable controls during animation
            p1Left.enabled = false
            p1Right.enabled = false
            p1Punch.enabled = false
            p1Kick.enabled = false
            p1Special.enabled = false
            p1Block.enabled = false
            p2Left.enabled = false
            p2Right.enabled = false
            p2Punch.enabled = false
            p2Kick.enabled = false
            p2Special.enabled = false
            p2Block.enabled = false

            this.airplane.setAlpha(1)
    
            // Create a tween to move the airplane
            var tween = this.tweens.add({
                targets: this.airplane,
                x: 400,
                y: 226,
                duration: 1000,
                ease: 'Linear',
                onComplete: function () {
                    // Code to execute after the tween is complete
                    console.log('Movement complete!')
    
                    // Enable controls again
                    p1Left.enabled = true
                    p1Right.enabled = true
                    p1Punch.enabled = true
                    p1Kick.enabled = true
                    p1Special.enabled = true
                    p1Block.enabled = true
                    p2Left.enabled = true
                    p2Right.enabled = true
                    p2Punch.enabled = true
                    p2Kick.enabled = true
                    p2Special.enabled = true
                    p2Block.enabled = true
    
                    // Start the next scene and pass correct data
                    this.scene.start('playScene', {
                        p1Karate: this.p1Karate,
                        p1Rumble: this.p1Rumble,
                        p2Karate: this.p2Karate,
                        p2Rumble: this.p2Rumble,
                    })
                }.bind(this) // Ensure 'this' refers to the current scene inside the onComplete callback
            })
        }

    }
}