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
        this.slingShot = new Car(this, game.config.width/2, 50, 'slingshot', 0, 5)
            .setOrigin(0,0).setScale(1,1);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //game over flag
        this.gameOver = false;
    }

    update() {
        this.road.tilePositionY -= 2;

        if(!this.gameOver){
            this.p1Wheel.update();
            this.slingShot.update();
        }

        if(this.checkCollision(this.p1Wheel, this.slingShot)){
            this.gameOver = true;
            //console.log('game over!');
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

}