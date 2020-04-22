class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        //load audio here

    }

    create() {
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'FIRE TIRES', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY, 'Use ↔ arrows to move./n Survive for as long as you can.', menuConfig).setOrigin(.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.config = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press UP to Start', menuConfig).setOrigin(.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);  
    }
    
    update() {
        //if the player presses the up arrow the game will start
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          this.scene.start("playScene");    
        }
    }
}