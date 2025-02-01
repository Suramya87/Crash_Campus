// Code Practice: Crash_Campus
// Date: 01/31/2025

"use strict"

// let config = {
    // type: Phaser.AUTO, 
    // scene: [ MainMenu, Play],
// }

// let game = new Phaser.Game(config)

let config = {
    type: Phaser.AUTO,
    // width: 640,
    // height: 480,
    width: 1280,
    height: 1024,
    scene: [ Play ]
  }

let game = new Phaser.Game(config)

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT