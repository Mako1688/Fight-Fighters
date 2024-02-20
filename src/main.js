// Game: Fight Fighters
// Name: Marco Ogaz-Vega
// Date: 2/20/24
/*
Approx hours:


*/

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 900,
    height: 640,
    pixelArt: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    frameRate: 60,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x:0,
                y:0
            }
        }
    },
    scene: [Load, Title, Select, Play, Win, Credits]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

//reserve key bindings


//set music boolean
let musicPlaying = false