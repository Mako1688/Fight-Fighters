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
        
        if(this.p1Wins == 2){
            this.add.text(game.config.width/2, game.config.height/2, 'P1 WINS', menuConfig).setOrigin(0.5, 0.5)
        } else if(this.p2Wins == 2){
            this.add.text(game.config.width/2, game.config.height/2, 'P2 WINS', menuConfig).setOrigin(0.5, 0.5)
        }
        
    }

    update() {

    }
}