class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {
        this.PLAYER_VELOCITY = 350
        // this.Player_turing = false
    }
    preload() {
        this.load.image('Lines', './assets/trafficLines.png')
        this.load.image('Strips', './assets/rumbleStrips.png')
        this.load.image('Black', './assets/blacktopBG.png')
        this.load.audio('death', './assets/STAY_IN_THE_LANE.mp3')
        this.load.spritesheet('character','./assets/testcar.png',{
            frameWidth: 128
        })
    }
    create() {
        // green UI background
        // this.line1 = this.physics.add.sprite(285, 480, 'Black', 0);
        // this.line1.setSize(8,960)
        // this.line1.setImmovable(true);
        // this.line2 = this.physics.add.sprite(530, 480, 'Black', 0);
        // this.line2.setSize(8,960)
        // this.line2.setImmovable(true);
        // this.line3 = this.physics.add.sprite(773, 480, 'Black', 0);
        // this.line3.setSize(8,960)
        // this.line3.setImmovable(true);
        // this.line4 = this.physics.add.sprite(1014, 480, 'Black', 0);
        // this.line4.setSize(8,960)
        // this.line4.setImmovable(true);
        // this.lanes = this.add.group(this.line1, this.line2, this.line3, this.line4)
        this.lanes = this.physics.add.group({
            key: 'Black',
            frameQuantity: 4, // Create 4 lanes
            setXY: { x: 285, y: 480, stepX: 245 }, // Position lanes with a step of 245 pixels on the X-axis
            setSize: { width: 8, height: 960 } // Set collision box size for all lanes
        });
        this.black = this.add.tileSprite(0, 0, 640 , 480, 'Black').setOrigin(0, 0).setScale(2)
        // this
        this.lines = this.add.tileSprite(0, 0, 640, 480, 'Lines').setOrigin(0, 0).setScale(2)
        // this.lines.setScale(2)
        this.strips = this.add.tileSprite(0, 0, 640, 480, 'Strips').setOrigin(0, 0).setScale(2)
        // this.box2 = this.physics.add.sprite(400, 300, 'Black', 0);
        // box2.body.setVelocityX(-100); // Make it move left
        // this.strips.setScale(2)
        // this.black = this.add.tileSprite(0, 0, 640, 720, 'Black').setOrigin(0, 0)
        const PLAYER = () => {
        this.player = this.physics.add.sprite(width/2, height/2, 'character',1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.setSize(56,64)
        this.physics.add.overlap(this.player, this.lanes, ()=>{
            // this.sound.play('death')
            console.log('death')
        })
        }
        PLAYER()
        
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
        // this.strips.tilePositionY -= 2
        // this.lines.tilePositionY -= 4
        let playerVector = new Phaser.Math.Vector2(0, 0);
        playerVector.y = 0.1;
    
        console.log(this.lanes.getChildren());
        // Check for input and update direction
        if (cursors.left.isDown) {
            playerVector.x = -1;
            // playerDirection = 'left';
            this.player.play('idle-left')
            console.log("left")

        } else if (cursors.right.isDown) {
            playerVector.x = 1;
            // playerDirection = 'right';
            this.player.play('idle-right')
            console.log("right")
        }

        if (cursors.up.isDown) {
            this.strips.tilePositionY -= 4
            this.lines.tilePositionY -= 8
            playerVector.y = -0.5;
            this.player.play('speed')
            // playerDirection = 'up';
        } else if (cursors.down.isDown) {
            this.strips.tilePositionY -= 0.5
            this.lines.tilePositionY -= 1
            playerVector.y = 0.5;
            this.player.play('speed')
            // playerDirection = 'down';
        } 
        if (!cursors.up.isDown && !cursors.down.isDown && !cursors.right.isDown && !cursors.left.isDown) {
            this.player.play('normal')
        }
        // playerVector.normalize();
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x,this.PLAYER_VELOCITY * playerVector.y);

    
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x,this.PLAYER_VELOCITY * playerVector.y);
        // let playerMovement = playerVector.length() ? 'walk' : 'idle';
    
        // Only update the last direction if the player is moving
        // if (playerVector.length()) {
            // this.lastDirection = playerDirection;
        // }
    
        // this.player.play(playerMovement + '-' + this.lastDirection, true);
        // this.player.play('normal')
    }
}

