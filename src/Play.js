class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('Lines', './assets/trafficLines.png')
        this.load.image('Strips', './assets/rumbleStrips.png')
        this.load.image('Black', './assets/blacktopBG.png')
    }
    create() {
        // green UI background
        this.black = this.add.tileSprite(0, 0, 1280 , 1280, 'Black').setOrigin(0, 0)
        this.lines = this.add.tileSprite(0, 0, 1280, 1280, 'Lines').setOrigin(0, 0)
        this.lines.setScale(2)
        this.strips = this.add.tileSprite(0, 0, 1280, 1280, 'Strips').setOrigin(0, 0)
        this.strips.setScale(2)
        // this.black = this.add.tileSprite(0, 0, 1280, 720, 'Black').setOrigin(0, 0)
    }

    update() {
        this.strips.tilePositionY -= 2
        this.lines.tilePositionY -= 4
    }
}

