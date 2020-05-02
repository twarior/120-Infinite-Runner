class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload(){
        //load audio here
        this.load.audio('sfx_button', './assets/Sounds/ButtonPress(Credits).wav');
        this.load.audio('music_roadbeasts', './assets/sounds/RoadBeasts_Chiptune.wav');
        this.load.image('slingshot', './assets/SlingShot.png');
        this.load.image('deoraII', './assets/DeoraII.png');
        this.load.image('krazy8s', './assets/Krazy8S.png');
        this.load.image('roadrunner', './assets/PlymouthRoadrunner.png');
        this.load.image('ballistik', './assets/Ballistik.png');
        this.load.image('lightning', './assets/GreasedLightning.png');
    }
    
    create() {
        //music
        this.music = this.sound.add('music_roadbeasts');
        this.music.setLoop(true);
        this.music.play();

        //car images
        var sling = this.add.image(35, 35, 'slingshot').setOrigin(0, 0);
        var deora = this.add.image(450, 35, 'deoraII').setOrigin(0, 0);
        var krazy = this.add.image(240, 35, 'krazy8s').setOrigin(0, 0);
        var road = this.add.image(35, 750, 'roadrunner').setOrigin(0, 0);
        var ball = this.add.image(240, 750, 'ballistik').setOrigin(0, 0);
        var light = this.add.image(450, 750, 'lightning').setOrigin(0, 0);

        //credits display
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
        this.cameras.main.setBackgroundColor(0xDA8F5C)
        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/4;
        let textSpacer = 64;
        //this.add.text(centerX, centerY - textSpacer, 'FIRE TIRES', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY, 'Art: Katarina Kelso', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer*2, 'Programming: Tennessee Phillips Ward', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer*4, 'Sound: Kalvin Vinski', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpacer*6, 'Press ⇣ to go back to the Menu', menuConfig).setOrigin(.5);
        // define keys
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
 
    }
    
    update() {
        //if the player presses the up arrow the game will start
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.sound.play('sfx_button');
            this.music.stop();
            this.scene.start("menuScene");    
        }
    }
}