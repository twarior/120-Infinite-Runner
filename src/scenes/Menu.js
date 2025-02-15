class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        //load audio here
        this.load.image('menuScreen', './assets/Fire_Tires_Menu.png');
        this.load.audio('sfx_button', './assets/Sounds/ButtonPress(Credits).wav');
        this.load.audio('sfx_play', './assets/Sounds/Doppler1.wav');
        this.load.audio('music_dmv', './assets/Sounds/VertattheDMVChiptune.wav');
    }

    create() {
        //menu display
        let menuConfig = {
            fontFamily: 'Sunflower',
            fontSize: '28px',
            color: '#004FFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //dmv music
        this.music = this.sound.add('music_dmv');
        this.music.setLoop(true);
        this.music.play();

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2 ;
        let textSpacer = 64;
        var menuScreen = this.add.image(0, 0, 'menuScreen').setOrigin(0, 0);
        //this.add.text(centerX, centerY - textSpacer, 'FIRE TIRES', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer, 'Use  ⇠⇢  arrows to move', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer*2, 'Survive for as long as you can', menuConfig)
            .setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer*3, 'Press ⇡ to Start or ⇣ for Credits', menuConfig)
            .setOrigin(.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
 
    }
    
    update() {
        //if the player presses the up arrow the game will start
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.music.stop();
            this.scene.start("playScene");
            this.sound.play('sfx_play');  
        }
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.music.stop();
            this.sound.play('sfx_button');
            this.scene.start("creditsScene");    
        }
    }
}
