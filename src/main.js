/*
Beatrice Yu 
Rocket Patrol but better
approximate time to completion
mods: 
    Track a high score that persists across scenes and display it in the UI (5)
    Implement the 'FIRE' UI text from the original game (5)
    Implement the speed increase that happens after 30 seconds in the original game (5)
    Allow the player to control the Rocket after it's fired (5)
    Create 4 new explosion sound effects and randomize which one plays on impact (10)
    Display the time remaining (in seconds) on the screen (10)
*/

let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480, 
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config); 

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT; 

// set UI sizes
let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3; 

let highScore = 0; 