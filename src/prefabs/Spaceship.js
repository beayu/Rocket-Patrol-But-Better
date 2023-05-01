// Spaceship prefab 
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame); 

        //console.log("spaceship"); 

        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   //store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
    }

    update() {
        /*// move spaceship left 
        this.x -= this.moveSpeed; 
        // wrap around from left edge to right edge 
        if(this.x <= 0 - this.width) {
            this.x = game.config.width; 
        }*/

        if (this.flipX == false) {
            // move spaceship left 
            this.x -= this.moveSpeed; 
            // wrap around from left edge to right edge
            if (this.x <= 0 - this.width) {
                this.x = game.config.width; 
            }
        } else {
            // move spaceship right
            this.x += this.moveSpeed; 
            // wrap around from right edge to right edge
            if (this.x >= game.config.width) {
                this.x = 0 - this.width; 
            }
        }
    }

    // position reset 
    reset() {
        //this.x = game.config.width; 

        let m = Math.floor(Math.random() * 2); 
        if (m == 0) {
            this.flipX = true; 
            this.x = 0 - this.width;
        } else {
            this.flipX = false; 
            this.x = game.config.width;
        }
    }
}