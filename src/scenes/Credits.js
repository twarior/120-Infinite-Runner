class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload(){
        //load audio here
        this.load.audio('sfx_button', './assets/Sounds/ButtonPress(Credits).wav');

    }

    create() {
        
        //credits display
        let menuConfig = {
            fontFamily: 'Sunflower',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#004FFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/4;
        let textSpacer = 64;
        //this.add.text(centerX, centerY - textSpacer, 'FIRE TIRES', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY, 'Art: Katarina Kelso', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer*2, 'Programming: Tennessee Phillips Ward', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer*4, 'Sound: Kalvin Vinski', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer*6, 'Press DOWN to go back to the Menu', menuConfig).setOrigin(.5);
        // define keys
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
 
    }
    
    update() {
        //if the player presses the up arrow the game will start
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.sound.play('sfx_button');
            this.scene.start("menuScene");    
        }
    }
}