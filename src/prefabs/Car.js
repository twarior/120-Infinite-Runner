//spaceship prefab
class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y ,texture, frame, carSpeed, notBoosted) {
        super(scene, x, y, texture, frame);
        //add an object to the existing scene, dsiplay list and update list
        scene.add.existing(this);
        this.speed = carSpeed;
        this.boosted = !notBoosted;
    }

    update() {
        //move car down
        this.y += this.speed;
        //wrap around screen bounds
        if(this.y >= game.config.height && this.boosted == false){
            this.reset(1);
        }
        else if(this.y <= -200 && this.boosted == true){
            this.speed = 0;
        }
    }

    reset(addToScore) {
        game.settings.gameScore += addToScore;
        this.y = -150;
        let randoX =  Math.floor(Math.random()*(437-35) + 47);
        // if(randoX > 50){
        //     randoX = randoX - 100;
        // }
        this.x = randoX;
        if(this.x > game.config.width - 108) {
            this.x = game.config.width - 108;
        }
        if(this.x < 47){
             this.x = 47;
        }
        //Play.create.checkOverlap();
    }

}