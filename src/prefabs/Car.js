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
        this.y = 0;
    }

}