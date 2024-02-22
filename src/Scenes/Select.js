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

        //place character slect
        this.select = this.add.sprite(game.config.width / 2, game.config.height / 4 * 3, 'characters_select')

        this.p1cursor = this.add.sprite(this.select.x - 35, this.select.y, 'p1_cursor_sheet', 0)
        this.p2cursor = this.add.sprite(this.select.x - 35, this.select.y, 'p2_cursor_sheet', 0)

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
        p2Special = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COLON)
        p2Block = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD)

        //set charcater selection bools
        this.p1Rumble = true
        this.p2Rumble = true
        this.p1Karate = false
        this.p2Karate = false

    }

    update() {
        //play animations
        this.p1cursor.anims.play('p1_cursor_flash', true)
        this.p2cursor.anims.play('p2_cursor_flash', true)

        // if(p1Left.isDown && this.p1Rumble == true) {
        //     this.p1Karate = true
        //     this.p1Rumble = false
        //     this.p1cursor.x = this.select.x + 35
        // } else if(p1Left.isDown && this.p1Karate == true) {
        //     this.p1Rumble = true
        //     this.p1Karate = false
        //     this.p1cursor.x = this.select.x - 35
        // } else if(p1Right.isDown && this.p1Rumble == true) {
        //     this.p1Karate = true
        //     this.p1Rumble = false
        //     this.p1cursor.x = this.select.x + 35
        // } else if(p1Right.isDown && this.p1Karate == true) {
        //     this.p1Rumble = true
        //     this.p1Karate = false
        //     this.p1cursor.x = this.select.x - 35
        // }

        // if(p2Left.isDown && this.p2Rumble == true) {
        //     this.p2Karate = true
        //     this.p2Rumble = false
        //     this.p2cursor.x = this.select.x + 35
        // } else if(p2Left.isDown && this.p2Karate == true) {
        //     this.p2Rumble = true
        //     this.p2Karate = false
        //     this.p2cursor.x = this.select.x - 35
        // } else if(p2Right.isDown && this.p2Rumble == true) {
        //     this.p2Karate = true
        //     this.p2Rumble = false
        //     this.p2cursor.x = this.select.x + 35
        // } else if(p2Right.isDown && this.p2Karate == true) {
        //     this.p2Rumble = true
        //     this.p2Karate = false
        //     this.p2cursor.x = this.select.x - 35
        // }
        
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



    }
}