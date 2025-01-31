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
        this.black = this.add.tileSprite(0, 0, 640, 480, 'Black').setOrigin(0, 0)
        this.lines = this.add.tileSprite(0, 0, 640, 480, 'Lines').setOrigin(0, 0)
        this.strips = this.add.tileSprite(0, 0, 640, 480, 'Strips').setOrigin(0, 0)
        // this.black = this.add.tileSprite(0, 0, 1280, 720, 'Black').setOrigin(0, 0)
    }

    update() {
        this.strips.tilePositionY -= 2
        this.lines.tilePositionY -= 4
    }
}

