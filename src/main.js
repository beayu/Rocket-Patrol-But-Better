/*
Beatrice Yu 
Rocket Patrol: The Red Planet
approximate time to completion: 13
mods: 
    Track a high score that persists across scenes and display it in the UI (5)
    Implement the 'FIRE' UI text from the original game (5)
    Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
    Implement the speed increase that happens after 30 seconds in the original game (5)
    Randomize each spaceship's movement direction at the start of each play (5)
    Create a new scrolling tile sprite for the background (5)
    Allow the player to control the Rocket after it's fired (5)
    Create 4 new explosion sound effects and randomize which one plays on impact (10)
    Display the time remaining (in seconds) on the screen (10)
    Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
        - I didn't use all of the sprites in the texture atlas I made
    Create a new title screen (e.g., new artwork, typography, layout) (10)
        - amanda's pink 0xffc1cc
        - mauve 4f2b37
        - peach facd9d
        - pink c95059
        - brown red 5c2928
        - dark red 2b0a13
        - dark purple 100710
    Implement parallax scrolling for the background (10)
        - ringed planet moves fastest, then small planets, then big planet, then stars, then background
    Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
        - asteroid at the top is smaller and worth 40 ponts
citations: 
    artwork created by Luis Zuno (@ansimuz)
    background music created by Alex-Productions
    Cromwell De Guzman - spaceship movement direction
    Thanyared Wong - pink page color
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