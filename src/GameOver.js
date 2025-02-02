class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    create() {
        // Add "Game Over" text
        this.add.text(width/2, height/2, 'Game Over', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Add "Restart" button
        const restartButton = this.add.text(width/2, height/2 + 150, 'Restart', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();

        // Restart the game when the button is clicked
        restartButton.on('pointerdown', () => {
            this.scene.start('playScene'); // Restart the main game scene
        });
    }
}