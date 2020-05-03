//Tennessee Phillips Ward, Katarina Kelso, Kalvin Vinski
//
//Fire Tires - May 2020
//
//Nathan Altice Rocket Patrol referenced for starting code
//
//Technical Tilt: A lot of these things were firsts for me even if they were part of the class examples.
//I think one of the trickier things for me was making the nimations play at specific times or getting 
//timed events to occur. One thing I think was a little more interesting was getting a different set of 
//sprites to appear without just deleting the old ones. At first I had several issues with the old sprites 
//still colliding with the player even though they were supposed to be gone, so I moved them off screen and 
//set their speed to 0 before trying to destroy them. This still meant that they would kinda just 'poof'
//out of existance so I created a method (obstaclesBeGone) which allowed them to fully go off screen one 
//more time without resseting their position. I then give the player a couple seconds before the harder 
//obstacles appear.
//-Tennessee
//
//Artistic Tilt:


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