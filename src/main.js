// Game: Fight Fighters
// Name: Marco Ogaz-Vega
// Date: 2/20/24
/*
Approx hours: 70 or more I lost count
Character sprites as well as explosion sprite taken from gravity Falls animator Paul Robertson
Every other sprite created by me
Sounds created by me other than the explosion and music sounds
All code created by me except for statemachine by Nathan Altice
*/

'use strict'

let config = {
    type: Phaser.WEBGL,
    width: 920,
    height: 640,
    pixelArt: true,
    mode: Phaser.Scale.FIT,
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
    scene: [Load, Title, Select, AudioScene, Play, Pause, Win, Credits]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

//reserve key bindings
let keySPACE

//P1 binds
let p1Left, p1Right, p1Down, p1Punch, p1Kick, p1Special, p1Block

//P2 binds
let p2Left, p2Right, p2Down, p2Punch, p2Kick, p2Special, p2Block

//pause bind
let BackspaceKey, EnterKey

//set music boolean
let musicPlaying = false