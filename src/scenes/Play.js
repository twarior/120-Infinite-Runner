class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images and tile sprite if any
        this.load.image('slingshot', './assets/SlingShot.png');
        this.load.image('deoraII', './assets/DeoraII.png');
        this.load.image('krazy8s', './assets/Krazy8S.png');
        this.load.image('roadrunner', './assets/PlymouthRoadrunner.png');
        this.load.image('ballistik', './assets/Ballistik.png');
        this.load.image('lightning', './assets/GreasedLightning.png');
        this.load.image('road', './assets/Road2.png');
        this.load.image('banana', './assets/Banana.png');
        this.load.image('cone', './assets/Cone.png');
        this.load.image('turtle', './assets/Turtle.png');
        this.load.image('rock', './assets/Rock.png');
        this.load.image('pothole', './assets/Pothole.png');
        this.load.spritesheet('wheel', './assets/Wheel.png', {frameWidth: 16, frameHeight: 46, 
            startFrame: 0, endFrame: 3});
        this.load.spritesheet('exclamation', './assets/Exclamation.png', {frameWidth: 20, frameHeight: 40, 
            startFrame: 0, endFrame: 10});
        this.load.spritesheet('boosted', './assets/Krazy8S_Animation.png', {frameWidth: 64, 
            frameHeight: 140, startFrame: 0, endFrame: 5});
        this.load.spritesheet('death', './assets/Wheel_Explosion_Redraw.png', {frameWidth: 96, 
            frameHeight: 96, startframe: 0, endFrame: 9}); 
        this.load.spritesheet('explode', './assets/Smokey_Explosion.png', {frameWidth: 128, frameHeight:150, 
            startFrame: 0, endFrame: 4});
        this.load.audio('sfx_crash', './assets/Sounds/CarCrash.wav');
        this.load.audio('sfx_boosted', './assets/Sounds/Doppler3.wav');
        this.load.audio('sfx_warning', './assets/Sounds/WarningSound.wav');
        this.load.audio('sfx_lose', './assets/sounds/LosesoundbySnabisch.wav');
        this.load.audio('sfx_button', './assets/Sounds/ButtonPress(Credits).wav');
        this.load.audio('music_roadbeasts', './assets/sounds/RoadBeasts_Chiptune.wav');

    }

    create() {
        //place the tile sprite
        this.road = this.add.tileSprite(0, 0, 540, 0, 'road').setOrigin(0, 0);

        //player 1 wheel, almost certainly no player 2
        this.p1Wheel = new Wheel(this, game.config.width/2, 800, 'wheel')
            .setScale(1, 1).setOrigin(0, 0);

        //boosted car needs to start in game earlier?
        this.boostedCar = new Car(this, 250, 1250, 'krazy8s', 0, 
                0, false).setOrigin(0, 0).setScale(1, 1);

        //looping music
        this.music = this.sound.add('music_roadbeasts');
        this.music.setLoop(true);
        this.music.play();
        
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


        //occasional boosted car
        for(let i = 45000; i < 1000000; i += 15000){
            let xBetween = Math.floor(Math.random()*(432-47) + 47);
            this.clock = this.time.delayedCall(i, () => {
                //play an explamation animation, notifying the player that something is about to happen
                this.exclamationAnim(xBetween, 825);
                this.boostAnim
                this.boostedCar.x = xBetween;
                this.boostedCar.y = 4000;
                this.boostedCar.speed = -game.settings.carSpeed;
            }); 
            this.clock = this.time.delayedCall(i+2750, () => {
                //warning sound right before car appears
                if(!this.gameOver){
                    this.sound.play('sfx_warning');
                }
            })
            this.clock = this.time.delayedCall(i+3250, () => {
                //boosted car actaully appears lol\
                if(!this.gameOver){
                    this.sound.play('sfx_boosted');
                }
            }) 
        }

        //animation for boosted car
        let config03 = {
            key: 'boostAnimate', 
            frames: this.anims.generateFrameNumbers('boosted', {start: 0, end: 5, first: 0}),
            framerate: 6,
            repeat: -1
        };
        this.anims.create(config03);
        this.boostAnim = this.add.sprite(this.boostedCar.x, this.boostedCar.y, 'boosted')
            .play('boostAnimate').setOrigin(0,0);

        this.boostedArray = [this.boostedCar];

        //animation for wheel explosion
        let config04 = {
            key: 'deathAnimation',
            frames: this.anims.generateFrameNumbers('death', {start: 0, end: 9, first: 0}),
            framerate: 2
        };
        this.anims.create(config04);

        //animation for car explosion
        let config05 = {
            key: 'explodeAnimation',
            frames: this.anims.generateFrameNumbers('explode', {start: 0, end: 4, first: 0}),
            framerate: 1
        }
        this.anims.create(config05);

        //cars
        this.slingShot = new Car(this, game.config.width/2 - 30, -3628, 'slingshot', 0, 
            game.settings.carSpeed, true).setOrigin(0,0).setScale(1,1);
        this.deoraII = new Car(this, 3*game.config.width/4 + 20, -4290, 'deoraII', 0, 
            game.settings.carSpeed, true).setOrigin(0,0).setScale(1,1);
        this.lightning = new Car(this, 1*game.config.width/4, -3920, 'lightning', 0, 
            game.settings.carSpeed, true).setOrigin(0,0).setScale(1,1);
        this.ballistik = new Car(this, 3*game.config.width/4 - 50, -4100, 'ballistik', 0, 
            game.settings.carSpeed, true).setOrigin(0,0).setScale(1,1);
        this.roadrunner = new Car(this, 1*game.config.width/4 - 90, -4600, 'roadrunner', 0, 
            game.settings.carSpeed, true).setOrigin(0,0).setScale(1,1);

        this.carsArray = [this.slingShot, this.deoraII, this.lightning, this.ballistik, this.roadrunner];

        //other obstacles
        this.rock = new Car(this, game.config.width/2 - 30, 0, 'rock', 0, 
            game.settings.roadSpeed, true).setOrigin(0,0).setScale(1,1);
        this.pothole = new Car(this, 3*game.config.width/4 + 20, -690, 'pothole', 0, 
            game.settings.roadSpeed, true).setOrigin(0,0).setScale(1,1);
        this.banana = new Car(this, 1*game.config.width/4, -320, 'banana', 0, 
            game.settings.roadSpeed, true).setOrigin(0,0).setScale(1,1);
        this.cone = new Car(this, 3*game.config.width/4 - 50, -500, 'cone', 0, 
            game.settings.roadSpeed, true).setOrigin(0,0).setScale(1,1);
        this.turtle = new Car(this, 1*game.config.width/4 - 90, -1000, 'turtle', 0, 
            game.settings.roadSpeed, true).setOrigin(0,0).setScale(1,1);

        this.obstacleArray = [this.rock, this.pothole, this.banana, this.cone, this.turtle];

        //key inputs for moving, and restarting or going to menu
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        //game over flag
        this.gameOver = false;
        
        //timed event
        this.thirySeconds = false;

        this.clock = this.time.delayedCall(30000, () => {
            this.thirySeconds = true;  
        });

        //speed up cars 3 times 
        this.clock = this.time.delayedCall(55000, () => {
            this.addSpeedToObs(this.carsArray);
        });

        this.clock = this.time.delayedCall(65000, () => {
            this.addSpeedToObs(this.carsArray);
        });
        this.clock = this.time.delayedCall(80000, () => {
            this.addSpeedToObs(this.carsArray)
        });
        
    }
    

    update() {
        

        if(!this.gameOver && this.thirySeconds == true){
            this.road.tilePositionY -= game.settings.roadSpeed;
            this.p1Wheel.update();
            this.animatedWheel.x = this.p1Wheel.x;
            this.slingShot.update();
            this.deoraII.update();
            this.lightning.update();
            this.roadrunner.update();
            this.ballistik.update();
            if(this.obstacleArray){
                this.obstaclesBeGone(this.obstacleArray);
                if(this.checkCollision(this.p1Wheel, this.obstacleArray)){
                    this.EndOfLine();
                }
            }
            if(this.checkCollision(this.p1Wheel, this.carsArray)){
                this.EndOfLine();
            }
            //this.checkOverlap(this.carsArray);
        }
        if(!this.gameOver && this.thirySeconds == false){
            this.road.tilePositionY -= game.settings.roadSpeed;
            this.p1Wheel.update();
            this.animatedWheel.x = this.p1Wheel.x;
            this.rock.update();
            this.pothole.update();
            this.banana.update();
            this.cone.update();
            this.turtle.update();
            if(this.checkCollision(this.p1Wheel, this.obstacleArray)){
                this.EndOfLine();
            }
            //this.checkOverlap(this.obstacleArray);
        }

        if(this.boostedCar && !this.gameOver){
            this.boostedCar.update();
            this.boostAnim.y = this.boostedCar.y;
            this.boostAnim.x = this.boostedCar.x
            if(this.checkCollision(this.p1Wheel, this.boostedArray)){
                this.EndOfLine();
            }
            this.checkCollision(this.boostedCar, this.carsArray);
            this.checkCollision(this.boostedCar, this.obstacleArray);
        }


        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.sound.play('sfx_button');
            this.scene.start("menuScene");
        } 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            game.settings.gameScore = 0;
            this.scene.restart(game.settings.gameScore);
        }
    }

    checkCollision(wheel, array) {
        // simple AABB checking
        let collision = false;
        for(let i = 0; i < array.length; i++){
            if (wheel.y < array[i].y + array[i].height && 
                wheel.y + wheel.height > array[i].y && 
                wheel.x < array[i].x + array[i].width &&
                wheel.width + wheel.x > array[i]. x) {
                    collision = true;
            } 
            if(collision == true){
                //console.log(array[i].texture.key);
                this.carExplode(array[i]);
                array[i].x = -200;
                array[i].alpha = 1;
                return true;

            }
        }
        return false;
    }

    EndOfLine(){
        //game over function:
        //sets the game to over, adds text, explodes wheel, stops other objects from moving
        this.gameOver = true;
        let textConfig = {
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
        this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', textConfig)
            .setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, '⇡ to Restart or ⇣ for Menu', 
            textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'You passed ' + game.settings.gameScore
             + ' obstacles!', textConfig).setOrigin(.5);
        this.animatedWheel.destroy();
        this.boostAnim.destroy();
        this.wheelExplode(this.p1Wheel);
        this.music.stop();
    }

    addSpeedToObs(array){
        //small function that makes the cars go faster (or any array of objects with a speed field)
        for(let i = 0; i < array.length; i++){
            let obs = array[i];
            obs.speed += 2;
        }
    }

    exclamationAnim(x , y) {
        if(!this.gameOver){
            let excl = this.add.sprite(x, y, 'exclamation').setOrigin(0, 0);
            excl.anims.play('exclamat');
            excl.on('animationcopmplete', () => {
                excl.destroy();
            });
            //sound effect go here if there is one
        }
    }

    obstaclesBeGone(array){
        //lets the smaller obstacles go off screen before being destroyed
        //sets the speed to 0 because otherwise there was a bug where the player could die to invisable 
        //obstacles.
        let count = 0;
        for(let i = 0; i < array.length; i++){
            if(array[i]){
                array[i].update()
                if(array[i].y >= game.config.height){
                    array[i].speed = 0;
                    array[i].x = -200;
                    array[i].destroy();
                }
            }
            else {
                count++;
            }
        }
        if(count = 5){
            array = null;
        }
    }

    wheelExplode(wheel){
        wheel.alpha = 0; //hide the wheel
        let death = this.add.sprite(wheel.x - 40, wheel.y - 25, 'death').setOrigin(0, 0);
        death.anims.play('deathAnimation');
        death.on('animationcomplete', () => {
            death.destroy();
        });
        this.sound.play('sfx_lose');
    }

    carExplode(car){
        car.alpha = 0; //hide the wheel
        let crash = this.sound.add('sfx_crash');
        crash.setVolume(.5);
        let explode = this.add.sprite(car.x - 45, car.y - 45, 'explode').setOrigin(0, 0);
        explode.anims.play('explodeAnimation');
        explode.on('animationcomplete', () => {
            explode.destroy();
        });
        crash.play();
    }
}