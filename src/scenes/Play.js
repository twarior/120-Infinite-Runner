class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images and tile sprite if any
        this.load.image('slingshot', './assets/SlingShot.png');
        this.load.image('road', './assets/Road.png');
        this.load.image('wheel', './assets/Wheel.png');
    }

    create() {
        //place the tile sprite
        this.road = this.add.tileSprite(0, 0, 540, 0, 'road').setOrigin(0, 0);

        //player 1 wheel, almost certainly no player 2
        this.p1Wheel = new Wheel(this, game.config.width/2, 800, 'wheel')
            .setScale(1, 1).setOrigin(0, 0);

        //cars
        this.slingShot01 = new Car(this, game.config.width/2 - 30, 0, 'slingshot', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);
        this.slingShot02 = new Car(this, 3*game.config.width/4 + 20, -690, 'slingshot', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);
        this.slingShot03 = new Car(this, 1*game.config.width/4, -320, 'slingshot', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);
        this.slingShot04 = new Car(this, 3*game.config.width/4 - 50, -500, 'slingshot', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);
        this.slingShot05 = new Car(this, 1*game.config.width/4 - 90, -1000, 'slingshot', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        //game over flag
        this.gameOver = false;
    }

    update() {
        this.road.tilePositionY -= 2;

        if(!this.gameOver){
            this.p1Wheel.update();
            this.slingShot01.update();
            this.slingShot02.update();
            this.slingShot03.update();
            this.slingShot04.update();
            this.slingShot05.update();
        }

        if(this.checkCollision(this.p1Wheel, this.slingShot01)){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'UP to Restart or DOWN for Menu').setOrigin(0.5);
        }
        if(this.checkCollision(this.p1Wheel, this.slingShot02)){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'UP to Restart or DOWN for Menu').setOrigin(0.5);
        }
        if(this.checkCollision(this.p1Wheel, this.slingShot03)){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'UP to Restart or DOWN for Menu').setOrigin(0.5);
        }
        if(this.checkCollision(this.p1Wheel, this.slingShot04)){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'UP to Restart or DOWN for Menu').setOrigin(0.5);
        }
        if(this.checkCollision(this.p1Wheel, this.slingShot05)){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'UP to Restart or DOWN for Menu').setOrigin(0.5);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene");
        } 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.restart(0);
        }
    }

    checkCollision(wheel, car) {
        // simple AABB checking
        if (wheel.y < car.y + car.height && 
            wheel.y + wheel.height > car.y && 
            wheel.x < car.x + car.width &&
            wheel.width + wheel.x > car. x) {
                return true;
        } else {
            return false;
        }
    }

    EndOfLine(){
        
    }

}