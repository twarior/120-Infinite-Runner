//Tennessee Phillips Ward, Katarina Kelso, Kalvin Vinski
//
//Infinit Runner for 120 Series
//
//Nathan Altice Rocket Patrol referenced for starting code

let config = {
    type: Phaser.CANVAS,
    width: 540,
    height: 960,
    scene: [Menu, Play],

};

let game = new Phaser.Game(config);

game.settings = {
    carSpeed: 7    
}

let keyLEFT, keyRIGHT, keyUP, keyDOWN;