//rocket prefab
class Wheel extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y ,texture, frame) {
        super(scene, x, y, texture, frame);

        //add an object to the existing scene, dsiplay list and update list
        scene.add.existing(this);

    }

    update() {
        //left/right movement
        if(keyLEFT.isDown && this.x >= 47){
            this.x -= 5;
        }
        if(keyRIGHT.isDown && this.x <= game.config.width -62) {
            this.x += 5;
        }
    }
}