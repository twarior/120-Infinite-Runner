class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images and tile sprite if any
        this.load.image('slingshot', './assets/SlingShot.png');
        this.load.image('deoraII', './assets/DeoraII.png');
        this.load.image('road', './assets/Road2.png');
        this.load.spritesheet('wheel', './assets/Wheel.png', {frameWidth: 16, frameHeight: 46, 
            startFrame: 0, endFrame: 3});
        this.load.image('rock', './assets/Rock.png');
        this.load.image('pothole', './assets/Pothole.png');
        this.load.spritesheet('wheel', './assets/Wheel.png', {frameWidth: 16, frameHeight: 46, 
            startFrame: 0, endFrame: 3});
        this.load.spritesheet('exclamation', './assets/Exclamation.png', {frameWidth: 20, frameHeight: 40, 
            startFrame: 0, endFrame: 9});
    }

    create() {
        //place the tile sprite
        this.road = this.add.tileSprite(0, 0, 540, 0, 'road').setOrigin(0, 0);

        //player 1 wheel, almost certainly no player 2
        this.p1Wheel = new Wheel(this, game.config.width/2, 800, 'wheel')
            .setScale(1, 1).setOrigin(0, 0);


        //animation for wheel    
        let config = {
            key: 'wheel_animate',
            frames: this.anims.generateFrameNumbers('wheel', {start:0, end:3, first: 0}),
            frameRate: 12,
            repeat: -1
        };
        this.anims.create(config);
        this.animatedWheel = this.add.sprite(this.p1Wheel.x, this.p1Wheel.y, 'wheel').play('wheel_animate')
            .setOrigin(0,0);


        //animation for exclamation
        let config02 = {
            key: 'exclamat',
            frames: this.anims.generateFrameNumbers('exclamation', {start: 0, end: 9, first: 0}), 
            frameRate: 3,
        };
        this.anims.create(config02);

        //cars
        this.slingShot01 = new Car(this, game.config.width/2 - 30, -128, 'slingshot', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);
        this.slingShot02 = new Car(this, 3*game.config.width/4 + 20, -690, 'deoraII', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);
        this.slingShot03 = new Car(this, 1*game.config.width/4, -320, 'slingshot', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);
        this.slingShot04 = new Car(this, 3*game.config.width/4 - 50, -500, 'deoraII', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);
        this.slingShot05 = new Car(this, 1*game.config.width/4 - 90, -1000, 'slingshot', 0, 
            game.settings.carSpeed).setOrigin(0,0).setScale(1,1);

        this.carsArray = [this.slingShot01, this.slingShot02, this.slingShot03, this.slingShot04, this.slingShot05];

        //other obstacles
        this.rock01 = new Car(this, game.config.width/2 - 30, 0, 'rock', 0, 
            game.settings.roadSpeed).setOrigin(0,0).setScale(1,1);
        this.pothole01 = new Car(this, 3*game.config.width/4 + 20, -690, 'pothole', 0, 
            game.settings.roadSpeed).setOrigin(0,0).setScale(1,1);
        this.rock02 = new Car(this, 1*game.config.width/4, -320, 'rock', 0, 
            game.settings.roadSpeed).setOrigin(0,0).setScale(1,1);
        this.pothole02 = new Car(this, 3*game.config.width/4 - 50, -500, 'pothole', 0, 
            game.settings.roadSpeed).setOrigin(0,0).setScale(1,1);
        this.rock03 = new Car(this, 1*game.config.width/4 - 90, -1000, 'rock', 0, 
            game.settings.roadSpeed).setOrigin(0,0).setScale(1,1);

        this.obstacleArray = [this.rock01, this.rock02, this.rock03, this.pothole01, this.pothole02];

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
        
        //timed event
        this.thirySeconds = false;

        this.clock = this.time.delayedCall(30000, () => {
            this.rock01.y = -200;
            this.rock02.y = -200;
            this.rock03.y = -200;
            this.pothole01.y = -200;
            this.pothole02.y = -200;
            this.rock01.destroy();
            this.rock02.destroy();
            this.rock03.destroy();
            this.pothole01.destroy();
            this.pothole02.destroy();
            this.thirySeconds = true;  
        });

        this.clock = this.time.delayedCall(45000, () => {
            this.addSpeedToObs(this.carsArray);
            console.log('spped up 1');
        });

        this.clock = this.time.delayedCall(60000, () => {
            this.addSpeedToObs(this.carsArray);
            console.log('spped up 2');
        });
        this.clock = this.time.delayedCall(75000, () => {
            this.addSpeedToObs(this.carsArray);
            console.log('spped up 3');
        });

        //occasional up car
        for(let i = 15000; i < 100000; i += 15000){
            let xBetween = Math.random()*(432-47) + 47;
            this.clock = this.time.delayedCall(i, () => {
                this.exclamationAnim(xBetween, 825);
                console.log('\"\!\"')
            });
            
        }
        
    
    }
    

    update() {
        

        if(!this.gameOver && this.thirySeconds == true){
            this.road.tilePositionY -= game.settings.roadSpeed;
            this.p1Wheel.update();
            this.animatedWheel.x = this.p1Wheel.x;
            this.slingShot01.update();
            this.slingShot02.update();
            this.slingShot03.update();
            this.slingShot04.update();
            this.slingShot05.update();
            //this.checkOverlap(this.carsArray);
        }
        if(!this.gameOver && this.thirySeconds == false){
            this.road.tilePositionY -= game.settings.roadSpeed;
            this.p1Wheel.update();
            this.animatedWheel.x = this.p1Wheel.x;
            this.rock01.update();
            this.rock02.update();
            this.rock03.update();
            this.pothole01.update();
            this.pothole02.update();
            //this.checkOverlap(this.obstacleArray);
            if(this.checkCollision(this.p1Wheel, this.rock01)){
                this.EndOfLine();
            }
            if(this.checkCollision(this.p1Wheel, this.rock02)){
                this.EndOfLine();
            }
            if(this.checkCollision(this.p1Wheel, this.rock03)){
                this.EndOfLine();
            }
            if(this.checkCollision(this.p1Wheel, this.pothole01)){
                this.EndOfLine();
            }
            if(this.checkCollision(this.p1Wheel, this.pothole02)){
                this.EndOfLine();
            }
        }
        

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
        if(this.checkCollision(this.p1Wheel, this.rock01)){
            this.EndOfLine();
        }
        if(this.checkCollision(this.p1Wheel, this.rock02)){
            this.EndOfLine();
        }
        if(this.checkCollision(this.p1Wheel, this.rock03)){
            this.EndOfLine();
        }
        if(this.checkCollision(this.p1Wheel, this.pothole01)){
            this.EndOfLine();
        }
        if(this.checkCollision(this.p1Wheel, this.pothole02)){
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
             + ' obstacles!').setOrigin(.5);
        this.animatedWheel.destroy();
    }

    checkOverlap(array) {
        for(let i = 0; i < array.length; i ++){
            for(let j = 0; j < array.length; j ++){
                if(i != j){
                    let carA = array[i];
                    let carB = array[j];
                    if(this.checkCollision(carA, carB)){
                        carB.reset(0);
                        //console.log('car collision has occured and attempted to reset');
                        //game.settings.gameScore -= 1;
                    }
                }
            }
        }
    }

    addSpeedToObs(array){
        for(let i = 0; i < array.length; i++){
            let obs = array[i];
            obs.speed += 3;
        }
    }

    exclamationAnim(x , y) {
        let excl = this.add.sprite(x, y, 'exclamation').setOrigin(0, 0);
        excl.anims.play('exclamat');
        excl.on('animationcopmplete', () => {
            excl.destroy();
        });
        //sound effect go here if there is one
    }
}