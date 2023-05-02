class Play extends Phaser.Scene {
    constructor() {
        super('playScene'); 
    }

    preload() {
        // load images/tile sprites
        // this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket', './assets/player2.png');
        // this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('asteroid', './assets/asteroid-small.png');
        this.load.image('spaceship', './assets/enemy1.png');
        this.load.atlas('sprites', './assets/spritesheet.png', './assets/sprites.json');
        //this.load.image('starfield', './assets/starfield.png');
        // this.load.image('space', './assets/bg-back.png');
        // this.load.image('stars', './assets/bg-stars.png');
        // this.load.image('planet', './assets/bg-planet.png');
        this.load.image('space', './assets/parallax-space-backgound.png');
        this.load.image('stars', './assets/parallax-space-stars.png');
        this.load.image('planet', './assets/parallax-space-big-planet.png');
        this.load.image('planets', './assets/parallax-space-far-planets.png');
        this.load.image('ring', './assets/parallax-space-ring-planet.png');

        // load spritesheet 
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9}); 
    }

    create() {
        this.bgm = this.sound.add('bgm'); 
        this.bgm.play(); 

        // tile sprite background 
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0); 
        // this.space = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0).setScale(2.8); 
        // this.stars = this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0, 0).setScale(2.8); 
        // this.planet = this.add.tileSprite(0, 300, 640, 480, 'planet').setOrigin(0, 0); 
        this.space = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0).setScale(2.8); 
        this.stars = this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0, 0).setScale(2); 
        this.planet = this.add.sprite(400, 160, 'planet').setOrigin(0, 0).setScale(2); 
        this.planets = this.add.sprite(0, 100, 'planets').setOrigin(0, 0).setScale(2); 
        this.ring = this.add.sprite(50, 210, 'ring').setOrigin(0, 0).setScale(2); 

        this.ship00 = new Spaceship(this, game.config.width + borderUISize * 9, borderUISize * 4, 'asteroid', 0, 40).setOrigin(0, 0).setScale(2); 
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship',  0, 30).setOrigin(0, 0).setScale(2);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0).setScale(2);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0).setScale(2);

        // green UI background
        // this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0); 
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xffc1cc).setOrigin(0, 0); 

        // white borders 
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); 
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x3) 
        // this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        // this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        // this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // this.ship00 = new Spaceship(this, game.config.width + borderUISize * 9, borderUISize * 4, 'asteroid', 0, 40).setOrigin(0, 0).setScale(2); 
        // this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship',  0, 30).setOrigin(0, 0).setScale(2);
        // this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0).setScale(2);
        // this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0).setScale(2);
        this.anims.create({
            key: 'ships', 
            frames: this.anims.generateFrameNames('sprites', {
                prefix: 'enemy', 
                start: 1, 
                end: 5, 
                suffix: '',
                zeroPad: 1, 
            }),
            frameRate: 8, 
            repeat: -1
        });
        this.ship00.moveSpeed *= 1.3;
        this.ship01.anims.play('ships'); 
        this.ship02.anims.play('ships'); 
        this.ship03.anims.play('ships'); 

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); 
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 

        // animation config
        // this.anims.create({
        //     key: 'explode', 
        //     frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}), 
        //     frameRate: 30
        // });

        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNames('sprites', {
                prefix: 'explosion', 
                start: 1, 
                end: 5, 
                suffix: '', 
                zeroPad: 1
            }), 
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0; 

        // display score
        let scoreConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px', 
            backgroundColor: '#F3B141', 
            color: '#843605', 
            align: 'right', 
            padding: {
                top: 5, 
                bottom: 5, 
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        // display high score
        this.scoreRight = this.add.text(game.config.width - (borderUISize + borderPadding + 100), borderUISize + borderPadding * 2, highScore, scoreConfig);

        // GAME OVER flag 
        this.gameOver = false; 

        // 60-second play clock 
        scoreConfig.fixedWidth = 0; 
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {

            this.bgm.stop(); 

            if (this.p1Score > highScore) {
                highScore = this.p1Score;
            }
            this.scoreRight.text = highScore; 

            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5); 
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5); 
            this.gameOver = true;  
        }, null, this);

        // display timer
        let timerConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px', 
            color: '#F3B141', 
            align: 'right', 
            padding: {
                top: 5, 
                bottom: 5, 
            },
            fixedWidth: 0
        }
        this.timeRemaining = this.add.text(game.config.width - (borderUISize + borderPadding + 38), game.config.height - (borderUISize + borderPadding + 38), Math.floor(this.clock.getRemainingSeconds()), timerConfig);
 
        // 'fire' UI text
        let fireConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px', 
            backgroundColor: '#F3B141', 
            color: '#843605', 
            align: 'right', 
            padding: {
                top: 5, 
                bottom: 5, 
            },
            fixedWidth: 0, 
        }
        this.fireText = this.add.text(game.config.width / 2, borderUISize + borderPadding * 2, 'FIRE', fireConfig).setOrigin(0.5, 0);
        this.fireText.visible = false;

        // spaceship speed increase
        this.faster = this.time.delayedCall(game.settings.gameTimer / 2, () => {
            //console.log(this.ship01.moveSpeed);
            this.ship00.moveSpeed *= 2; 
            this.ship01.moveSpeed *= 2;
            this.ship02.moveSpeed *= 2;
            this.ship03.moveSpeed *= 2; 
            //console.log(this.ship01.moveSpeed);
        }, null, this);
    }

    update() {
        // check key input for restart 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(); 
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene'); 
        }

        //this.starfield.tilePositionX -= 4; 
        // this.space.tilePositionX -= 3;
        // this.stars.tilePositionX -= 2;
        // this.planet.tilePositionX -= 1;
        this.space.tilePositionX -= 3; 
        this.stars.tilePositionX -= 2;

        this.planet.x -= 1;
        this.planets.x -= 1.3;
        this.ring.x -= 1.5;

        if (this.planet.x <= 0 - this.planet.width * 2) {
            this.planet.x = game.config.width; 
        }
        if (this.planets.x <= 0 - this.planets.width * 2) {
            this.planets.x = game.config.width; 
        }
        if (this.ring.x <= 0 - this.ring.width) {
            this.ring.x = game.config.width; 
        }

        if (!this.gameOver) {
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update(); 
            this.ship03.update(); 
            this.ship00.update(); 

            // update timer
            this.timeRemaining.text = Math.floor(this.clock.getRemainingSeconds()); 
        }

        // check collisions 
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset(); 
            this.shipExplode(this.ship03); 
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship00)) {
            this.p1Rocket.reset(); 
            this.shipExplode(this.ship00); 
        }

        // make 'fire' visible/invisible
        if (this.p1Rocket.isFiring) {
            this.fireText.visible = true; 
        } else {
            this.fireText.visible = false; 
        }

    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width*2 && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height*2 && rocket.height + rocket.y > ship.y) {
            return true; 
        } else {
            return false; 
        }
    }

    shipExplode(ship) {
        // temporarily hide ship 
        ship.alpha = 0; 
        // create explosion sprite at ship's position 
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0).setScale(2); 
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again 
            boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points; 
        this.scoreLeft.text = this.p1Score; 

        //randomize explosion sounds
        let randomExplosion = ['sfx_explosion1', 'sfx_explosion3', 'sfx_explosion4', 'sfx_explosion5'];
        this.sound.play(randomExplosion[Math.floor(Math.random() * randomExplosion.length)]); 
    }
}