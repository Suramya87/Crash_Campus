class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('Lines', './assets/trafficLines.png')
        this.load.image('Strips', './assets/rumbleStrips.png')
        this.load.image('Black', './assets/blacktopBG.png')
        this.load.spritesheet('character','./assets/testcar.png',{
            frameWidth: 128
        })
    }
    create() {
        // green UI background
        this.black = this.add.tileSprite(0, 0, 1280 , 720, 'Black').setOrigin(0, 0)
        this.lines = this.add.tileSprite(0, 0, 1280, 720, 'Lines').setOrigin(0, 0)
        this.lines.setScale(2)
        this.strips = this.add.tileSprite(0, 0, 1280, 720, 'Strips').setOrigin(0, 0)
        this.strips.setScale(2)
        this.black = this.add.tileSprite(0, 0, 1280, 720, 'Black').setOrigin(0, 0)
        this.player = this.physics.add.sprite(width/2, height/2, 'character',1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.setSize(32,32).setOffset(8,16)
        
        this.anims.create({
            key: 'normal',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character',{
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'speed',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character',{
                start: 1,
                end: 1
            })
        })
        this.anims.create({
            key: 'idle-left',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character',{
                start: 2,
                end: 2
            })
        })
        this.anims.create({
            key: 'idle-right',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character',{
                start: 3,
                end: 3
            })
        })
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.strips.tilePositionY -= 2
        this.lines.tilePositionY -= 4
        let playerVector = new Phaser.Math.Vector2(0, 0);

    
    
        // Check for input and update direction
        if (cursors.left.isDown) {
            playerVector.x = -10;
            // playerDirection = 'left';
            this.player.play('idle-left')
            console.log("left")

        } else if (cursors.right.isDown) {
            playerVector.x = 10;
            // playerDirection = 'right';
            this.player.play('idle-right')
            console.log("right")
        }
    
        if (cursors.up.isDown) {
            this.strips.tilePositionY -= 4
            this.lines.tilePositionY -= 8
            this.player.play('speed')
        } else if (cursors.down.isDown) {
            playerVector.y = 1;
            // playerDirection = 'down';
        }
    
        playerVector.normalize();
        // this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x,this.PLAYER_VELOCITY * playerVector.y);

    
        // this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x,this.PLAYER_VELOCITY * playerVector.y);
        // let playerMovement = playerVector.length() ? 'walk' : 'idle';
    
        // Only update the last direction if the player is moving
        // if (playerVector.length()) {
            // this.lastDirection = playerDirection;
        // }
    
        // this.player.play(playerMovement + '-' + this.lastDirection, true);
        // this.player.play('normal')
    }
}

