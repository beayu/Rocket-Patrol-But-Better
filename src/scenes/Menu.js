class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene'); 
    }

    preload() {
        // load audio 
        this.load.audio('sfx_select', './assets/blip_select12.wav'); 
        this.load.audio('sfx_explosion', './assets/explosion38.wav'); 

        // new explosion sounds
        this.load.audio('sfx_explosion1', './assets/explosion1.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_explosion5', './assets/explosion5.wav');

        this.load.audio('sfx_rocket', './assets/rocket_shot.wav'); 

        // load bgm 
        this.load.audio('bgm', './assets/Alex-Productions - Aggressive Computer Gaming _ Enigma.mp3');

        // load menu background
        this.load.image('space', './assets/parallax-space-backgound.png');
        this.load.image('stars', './assets/parallax-space-stars.png');
        this.load.image('planet', './assets/parallax-space-big-planet.png');
        this.load.image('ring', './assets/parallax-space-ring-planet.png');
    }

    create() {
        //this.add.text(20, 20, "Rocket Patrol Menu"); 
        //this.scene.start('playScene');

        // background images
        this.add.tileSprite(-90, 0, 640, 480, 'space').setOrigin(0, 0).setScale(3);
        this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0, 0).setScale(2.5);
        this.add.image(450, 140, 'planet').setScale(2);
        this.add.image(100, 340, 'ring').setScale(2);


        // menu text configuration 
        let menuConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px', 
            backgroundColor: '#facd9d', 
            color: '#5c2928', 
            align: 'right', 
            padding: {
                top: 5, 
                bottom: 5, 
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PATROL: THE RED PLANET', menuConfig).setOrigin(0.5); 
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5); 
        menuConfig.backgroundColor = '#ffc1cc';
        menuConfig.color = '#100710';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode 
            game.settings = {
                spaceshipSpeed: 3, 
                gameTimer: 60000
            }
            this.sound.play('sfx_select'); 
            this.scene.start('playScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode 
            game.settings = {
                spaceshipSpeed: 4, 
                gameTimer: 45000
            }
            this.sound.play('sfx_select'); 
            this.scene.start('playScene');
        }
    }
}