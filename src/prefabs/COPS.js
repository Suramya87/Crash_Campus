class COPS extends Phaser.Scene {
    constructor() {
        super("DA_POLICE");
    }

    init(data) {
        this.player = data.player;
        this.roadPositions = data.roadPositions;
        this.height = data.height;
        this.CHASE_VELOCITY = data.CHASE_VELOCITY;
        this.followerSpeed = data.followerSpeed;
        this.CHASE = false;
        this.reposition = false;
        this.PATROL_COOLDOWN = 10000
    }

    create() {
        this.TARGET_X = Phaser.Math.RND.pick(this.roadPositions);
        this.TARGET_Y = Phaser.Math.Between(0, this.height);
        this.cops = this.physics.add.sprite(this.TARGET_X, 0, 'COPS', 0).setScale(3);
        // this.cops.body.setCollideWorldBounds(true);
        this.cops.setSize(56, 64);

        // this.TARGET_X = Phaser.Math.RND.pick(this.roadPositions);
        // this.TARGET_Y = Phaser.Math.Between(0, this.height);
        this.physics.add.collider(this.cops, this.player, (cops, player) => {
            if(this.scene.get('playScene').LANES){ 
            this.scene.pause('playScene');
            this.scene.start('gameOver');
            console.log('die')
            }
        });
        this.anims.create({
            key: 'chillin',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('COPS', {
                start: 0,
                end: 0
            })
        });

        this.anims.create({
            key: 'not-chillin',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('COPS', {
                start: 1,
                end: 3
            })
        });

        this.reposition = false;
    }

    update() {
        if (this.scene.get('playScene').LANES && !this.CHASE){
            // console.log('plz')
            this.cops.play('not-chillin');
            this.CHASE = true;
            this.TARGET_X = Phaser.Math.RND.pick(this.roadPositions);
            this.TARGET_Y = Phaser.Math.Between(0, this.height);
        }
        if (this.scene.get('playScene').LANES && this.CHASE) {
            this.locked = true;
            // this.cops.play('not-chillin')
            const direction = new Phaser.Math.Vector2(
                this.player.x - this.cops.x,
                this.player.y - this.cops.y
            );

            direction.normalize();
            this.cops.setVelocity(
                direction.x * this.CHASE_VELOCITY,
                direction.y * this.CHASE_VELOCITY
            );
        } else if (!this.scene.get('playScene').LANES ){
            // this.reposition = false;
            this.CHASE = false;
            this.cops.play('chillin');
            const direction = new Phaser.Math.Vector2(
                this.TARGET_X - this.cops.x,
                this.TARGET_Y - this.cops.y
            );

            direction.normalize();
            if (!this.reposition) {
                this.cops.setVelocity(
                    direction.x * this.followerSpeed,
                    direction.y * this.followerSpeed / 2
                );
                // this.locked = true
                this.time.delayedCall(2000, () => {
                    this.reposition = true;
                    console.log('this')
                    // this.CHASE = false;
                });
            }

            if (this.reposition && !this.CHASE) {
                this.CHASE = false;
                this.reposition = false;
                this.cops.setVelocity(0, 100);
                // this.TARGET_X = Phaser.Math.RND.pick(this.roadPositions);
                // this.TARGET_Y = Phaser.Math.Between(0, this.height);

                // this.time.delayedCall(this.PATROL_COOLDOWN, () => {
                    // this.reposition = false;
                    // console.log('that')
                    // this.CHASE = false;
                // });
            }
        }
    }
}

