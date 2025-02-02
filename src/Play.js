class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        this.PLAYER_VELOCITY = 350;
        this.followerSpeed = 100;
        this.CHASE_VELOCITY = 500;
        this.player_isTouching = false;
        this.player_isTurning = false;
        this.LANES = false;
        this.roadPositions = [168, 440, 653, 884];
        this.lanePositions = [285, 530, 773, 1014];
        this.laneHeight = 960;
        this.laneWidth = 8;
        this.TARGET_X = 0;
        this.TARGET_Y = 0;
    }

    preload() {
        this.load.image('Lines', './assets/trafficLines.png');
        this.load.image('Strips', './assets/rumbleStrips.png');
        this.load.image('Black', './assets/blacktopBG.png');
        this.load.audio('death', './assets/STAY_IN_THE_LANE.mp3');
        this.load.spritesheet('COPS', './assets/POLICE.png', {
            frameWidth: 100
        });
        this.load.spritesheet('character', './assets/testcar2.png', {
            frameWidth: 128
        });
    }

    create() {
        this.lanes = this.physics.add.group();
        for (let i = 0; i < this.lanePositions.length; i++) {
            const lane = this.physics.add.sprite(this.lanePositions[i], 480, 'Black', 0);
            lane.setSize(this.laneWidth, this.laneHeight);
            lane.setImmovable(true);
            this.lanes.add(lane);
        }

        this.black = this.add.tileSprite(0, 0, 640, 480, 'Black').setOrigin(0, 0).setScale(2);
        this.lines = this.add.tileSprite(0, 0, 640, 480, 'Lines').setOrigin(0, 0).setScale(2);
        this.strips = this.add.tileSprite(0, 0, 640, 480, 'Strips').setOrigin(0, 0).setScale(2);

        const PLAYER = () => {
            this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2);
            this.player.body.setCollideWorldBounds(true);
            this.player.setSize(56, 64);
            this.isCooldown = false;
            this.cooldownTime = 2000;
            this.player_isTouching = false;

            this.physics.add.overlap(this.player, this.lanes, () => {
                this.player_isTouching = true;

                if (!this.isCooldown && this.LANES) {
                    // this.scene.get('DA_POLICE').play('not-chillin');
                    this.sound.play('death', { volume: 0.1 });
                    console.log('death');
                    this.isCooldown = true;
                    this.time.delayedCall(this.cooldownTime, () => {
                        this.isCooldown = false;
                    });
                }
            });
        };
        
        PLAYER();

        // Start the PoliceScene and pass necessary data
        this.scene.launch('DA_POLICE', {
            player: this.player,
            roadPositions: this.roadPositions,
            height: this.cameras.main.height,
            CHASE_VELOCITY: this.CHASE_VELOCITY,
            followerSpeed: this.followerSpeed
        });

        this.anims.create({
            key: 'normal',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 0
            })
        });

        this.anims.create({
            key: 'speed',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        });

        this.anims.create({
            key: 'idle-left',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 2,
                end: 2
            })
        });

        this.anims.create({
            key: 'idle-right',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 3,
                end: 3
            })
        });

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (!this.player.destroyed) {
            if (!this.physics.world.overlap(this.player, this.lanes)) {
                this.player_isTouching = false;
            }

            this.strips.tilePositionY -= 2;
            this.lines.tilePositionY -= 2;
            let playerVector = new Phaser.Math.Vector2(0, 0);
            playerVector.y = 0.1;

            if (!this.player_isTouching) {
                this.LANES = false;
            }

            if (cursors.up.isDown) {
                this.strips.tilePositionY -= 4;
                this.lines.tilePositionY -= 4;
                playerVector.y = -1;
                this.player.play('speed');
            } else if (cursors.down.isDown) {
                this.strips.tilePositionY += 1;
                this.lines.tilePositionY += 1;
                playerVector.y = 1;
                this.player.play('speed');
            }

            if (cursors.left.isDown) {
                playerVector.x = -1;
                this.player.play('idle-left');
                this.player_isTurning = true;
            } else if (cursors.right.isDown) {
                playerVector.x = 1;
                this.player.play('idle-right');
                this.player_isTurning = true;
            }

            if (!cursors.right.isDown && !cursors.left.isDown) {
                this.player_isTurning = false;
            }

            if (!cursors.up.isDown && !cursors.down.isDown && !cursors.right.isDown && !cursors.left.isDown) {
                this.player.play('normal');
            }

            if (this.player_isTouching && !this.player_isTurning) {
                this.LANES = true;
            }

            playerVector.normalize();
            this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y);
        }
        // if (this.physics.world.collider(this.player, this.cops)) {
            // endScene(); // End the scene when player collides with police
        // }

    }
}