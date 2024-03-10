class Win extends Phaser.Scene {
    constructor() {
        super('winScene')
    }

    init(data) {
        this.p1Wins = data.p1Wins
        this.p2Wins = data.p2Wins

    }

    preload() {
        
    }

    create() {
        this.scene.stop('pauseScene')
        //add any button to start text
        this.rumble = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'rumble_win', 0).setScale(6)
        this.rumble.play('r_win')
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

        // Create a graphics object for boxes
        this.topBar = this.add.graphics()
        this.topBar.fillStyle(0x000000, 1)
        this.topBar.fillRect(0, 0, game.config.width, game.config.height / 5)

        // Create a graphics object for the health bar
        this.bottomBar = this.add.graphics()
        this.bottomBar.fillStyle(0x000000)
        this.bottomBar.fillRect(0, game.config.height - game.config.height / 5, game.config.width, game.config.height / 5)

        if(this.p1Wins == 2){
            this.add.text(game.config.width/2, game.config.height / 5 - 50, 'P1 WINS', menuConfig).setOrigin(0.5, 0.5)
        } else if(this.p2Wins == 2){
            this.add.text(game.config.width/2, game.config.height / 5 - 50, 'P2 WINS', menuConfig).setOrigin(0.5, 0.5)
        }

        this.add.text(game.config.width /2, game.config.height - 65, 'WINNERS DON\'T LOSE!', menuConfig).setOrigin(0.5, 0.5)
        
    }

    update() {

    }
}