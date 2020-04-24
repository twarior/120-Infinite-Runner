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

        this.carsArray = [this.slingShot01, this.slingShot02, this.slingShot03, this.slingShot04, this.slingShot05];
        
        //key inputs for moving, and restarting or going to menu
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        //game over flag
        this.gameOver = false;
    
        //arcade physics
        
        // this.timer = scene.time.addEvent({
        //     delay: 1000,
        //     callback: callback,
        //     //args: [],
        //     callbackScope: thisArg,
        //     loop: true
        // });
    
    
    }
    

    update() {
        this.road.tilePositionY -= 4;

        if(!this.gameOver){
            this.p1Wheel.update();
            this.slingShot01.update();
            this.slingShot02.update();
            this.slingShot03.update();
            this.slingShot04.update();
            this.slingShot05.update();
        }

        this.checkOverlap();

        if(this.checkCollision(this.p1Wheel, this.slingShot01)){
            this.EndOfLine();
        }
        if(this.checkCollision(this.p1Wheel, this.slingShot02)){
            this.EndOfLine();
        }
        if(this.checkCollision(this.p1Wheel, this.slingShot03)){
            this.EndOfLine();
        }
        if(this.checkCollision(this.p1Wheel, this.slingShot04)){
            this.EndOfLine();
        }
        if(this.checkCollision(this.p1Wheel, this.slingShot05)){
            this.EndOfLine();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene");
        } 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            game.settings.gameScore = 0;
            this.scene.restart(game.settings.gameScore);
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
        this.gameOver = true;
        //let score = timer.getElapsedSeconds();
        this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER').setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'UP to Restart or DOWN for Menu')
            .setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'You passed ' + game.settings.gameScore
             + ' cars!').setOrigin(.5);
    }

    checkOverlap() {
        for(let i = 0; i < this.carsArray.length; i ++){
            for(let j = 0; j < this.carsArray.length; j ++){
                if(i != j){
                    let carA = this.carsArray[i];
                    let carB = this.carsArray[j];
                    if(this.checkCollision(carA, carB)){
                        carB.reset(0);
                        //console.log('car collision has occured and attempted to reset');
                        //game.settings.gameScore -= 1;
                    }
                }
            }
        }
    }

}