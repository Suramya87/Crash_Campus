class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {
        this.PLAYER_VELOCITY = 350
        this.followerSpeed = 100
        this.player_isTouching = false
        this.player_isTurning = false
        this.LANES = false
        this.lanePositions = [285, 530, 773, 1014];
        this.laneHeight = 960; 
        this.laneWidth = 8; 
        this.TARGET_X = 0;
        this.TARGET_Y = 0;
    }
    preload() {
        this.load.image('Lines', './assets/trafficLines.png')
        this.load.image('Strips', './assets/rumbleStrips.png')
        this.load.image('Black', './assets/blacktopBG.png')
        this.load.audio('death', './assets/STAY_IN_THE_LANE.mp3')
        this.load.spritesheet('COPS', './assets/POLICE.png',{
            frameWidth: 100
        })
        this.load.spritesheet('character','./assets/testcar.png',{
            frameWidth: 128
        })
    }
    create() {

        // const lanePositions = [285, 530, 773, 1014];
        // const laneHeight = 960; 
        // const laneWidth = 8; 

        this.lanes = this.physics.add.group();
        for (let i = 0; i < this.lanePositions.length; i++) {
            const lane = this.physics.add.sprite(this.lanePositions[i], 480, 'Black', 0);
            lane.setSize(this.laneWidth, this.laneHeight);
            lane.setImmovable(true);
            this.lanes.add(lane);
        }
        this.black = this.add.tileSprite(0, 0, 640 , 480, 'Black').setOrigin(0, 0).setScale(2)

        this.lines = this.add.tileSprite(0, 0, 640, 480, 'Lines').setOrigin(0, 0).setScale(2)
        this.strips = this.add.tileSprite(0, 0, 640, 480, 'Strips').setOrigin(0, 0).setScale(2)

        const PLAYER = () => {
        this.player = this.physics.add.sprite(width/2, height/2, 'character',1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.setSize(56,64)
        // Cooldown variables
        this.isCooldown = false; // Flag to track cooldown state
        this.cooldownTime = 2000; // Cooldown duration in milliseconds (2 seconds)
        this.player_isTouching = false
        this.physics.add.overlap(this.player, this.lanes, ()=>{
            if (!this.isCooldown) { // Check if cooldown is not active
                this.sound.play('death', { volume: 0.1 }); // Play death sound
                // console.log('death'); // Print to console
                this.player_isTouching = true
                // Activate cooldown
                this.isCooldown = true;

                // Set a timer to reset the cooldown
                this.time.delayedCall(this.cooldownTime, () => {
                    this.isCooldown = false; // Reset cooldown flag
                    this.player_isTouching = false
                });
            } 
        })
        }
        PLAYER()
        const DA_POLICE = () => {
            this.cops = this.physics.add.sprite(width/2, height/2, 'COPS',0).setScale(3)
            this.cops.body.setCollideWorldBounds(true)
            this.cops.setSize(56,64)
            this.TARGET_X = Phaser.Math.RND.pick(this.lanePositions)
            this.TARGET_Y = Phaser.Math.Between(0,height)
            this.physics.add.collider(this.cops, this.player, (cops,player)=>{
                if (this.LANES) {
                console.log('GG')
                player.destory()
                }
            });
        }
        DA_POLICE()
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
        this.anims.create({
            key: 'chillin',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('COPS',{
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'not-chillin',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('COPS',{
                start: 1,
                end: 3
            })
        })
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.strips.tilePositionY -= 2
        this.lines.tilePositionY -= 2
        let playerVector = new Phaser.Math.Vector2(0, 0);
        // let copsVector = new Phaser.Math.Vector2(0, 0);
        playerVector.y = 0.1;

        // copsVector = new Phaser.Math.Vector2(playerVector.x - copsVector.x, playerVector.y - copsVector.y)
        // const direction = new Phaser.Math.Vector2(
            // this.player.x - this.cops.x,
            // this.player.y - this.cops.y
        // );

        // Normalize the direction vector
        // direction.normalize();

        // Move the follower
        // this.follower.setVelocity(
            // direction.x * this.followerSpeed,
            // direction.y * this.followerSpeed
        // );

        // Check for input and update direction
        if (cursors.left.isDown) {
            playerVector.x = -1;
            // playerDirection = 'left';
            this.player.play('idle-left')
            this.player_isTurning = true
            // console.log("left")

        } else if (cursors.right.isDown) {
            playerVector.x = 1;
            // playerDirection = 'right';
            this.player.play('idle-right')
            this.player_isTurning = true
            // console.log("right")
        }

        if (cursors.up.isDown) {
            this.strips.tilePositionY -= 4
            this.lines.tilePositionY -= 4
            playerVector.y = -1;
            this.player.play('speed')
            // playerDirection = 'up';
        } else if (cursors.down.isDown) {
            this.strips.tilePositionY += 1
            this.lines.tilePositionY += 1
            playerVector.y = 1;
            this.player.play('speed')
            // playerDirection = 'down';
        } 
        if (!cursors.up.isDown && !cursors.down.isDown && !cursors.right.isDown && !cursors.left.isDown) {
            this.player.play('normal')
            this.player_isTurning = false
        }
        if (this.player_isTouching && !this.player_isTurning) {
            this.LANES = true
        } else { this.LANES = false; }

        if (this.LANES) {
            this.cops.play('not-chillin')
            console.log('get fucked')
            const direction = new Phaser.Math.Vector2(
                this.player.x - this.cops.x,
                this.player.y - this.cops.y
            );
    
            // Normalize the direction vector
            direction.normalize();
            // Move the follower
            this.cops.setVelocity(
                direction.x * this.followerSpeed,
                direction.y * this.followerSpeed
            );
        } else { 
            // this.TARGET_X = Phaser.Math.RND.pick(this.lanePositions)
            // this.TARGET_Y = Phaser.Math.Between(0,height)
            this.cops.play('chillin')
            const direction = new Phaser.Math.Vector2(
                this.TARGET_X + 100 - this.cops.x,
                this.TARGET_Y - this.cops.y
            );
    
            // Normalize the direction vector
            direction.normalize();
            // Move the follower
            this.cops.setVelocity(
                direction.x * this.followerSpeed,
                direction.y * this.followerSpeed
            );
        
        }
        // const direction = new Phaser.Math.Vector2(
            // this.player.x - this.cops.x,
            // this.player.y - this.cops.y
        // );

        // Normalize the direction vector
        // direction.normalize();
        // Move the follower
        // this.cops.setVelocity(
            // direction.x * this.followerSpeed,
            // direction.y * this.followerSpeed
        // );

        // playerVector.normalize();
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x,this.PLAYER_VELOCITY * playerVector.y);

    
        // this.cops.setVelocity(this.followerSpeed * copsVector.x,this.followerSpeed * copsVector.y);

    }
}

