//spaceship prefab
class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y ,texture, frame, carSpeed) {
        super(scene, x, y, texture, frame);
        //add an object to the existing scene, dsiplay list and update list
        scene.add.existing(this);
        this.speed = carSpeed;

    }

    update() {
        //move car down
        this.y += this.speed;
        //wrap around screen bounds
        if(this.y >= game.config.height){
            this.reset();
        }
    }

    reset() {
        this.y = -this.height -(Math.random()*200);
        let randoX = Math.random()*game.config.width;
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
        
    }

}