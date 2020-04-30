//Tennessee Phillips Ward, Katarina Kelso, Kalvin Vinski
//
//Infinite Runner for 120 Series
//
//Nathan Altice Rocket Patrol referenced for starting code

let config = {
    type: Phaser.CANVAS,
    width: 540,
    height: 960,
    scene: [Menu, Play, Credits],

};

let game = new Phaser.Game(config);

game.settings = {
    roadSpeed: 4,
    carSpeed: 6,
    gameScore: 0, 
    notBoosted: true,  
}

let keyLEFT, keyRIGHT, keyUP, keyDOWN;