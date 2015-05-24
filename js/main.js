var mainState = {
    
    preload: function () {
        game.load.image('player', 'assets/player.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
    },
        
    create: function () {
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.Arcade);
        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;
        
        this.enemies = game.add.group();
        this.enemies.enableBody = true; 
        this.enemies.createMultiple(10, 'enemy');
        
        this.coin = game.add.sprite(60, 140, 'coin');
        game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5, 0.5);
        
        this.scoreLabel = game.add.text(30, 30, 'score: 0',
                                        {font: '18px Arial', fill: '#ffffff'});
        this.score = 0;
        
        
        
        this.createWorld();
        game.time.events.loop(2200, this.addEnemy, this);
        
    },
    
    update: function() {
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
        
        this.movePlayer();
        
        if(!this.player.inWorld) {
        this.playerDie();        
        }  

    },
    
    takeCoin: function(player, coin) {
        // Update the score
        this.score += 5;
        this.scoreLabel.text = 'score: ' + this.score;
        // Change the coin position
        this.updateCoinPosition();
        },
    
      updateCoinPosition: function() {
        var coinPosition = [
        {x: 140, y: 60}, {x: 360, y: 60}, 
        {x: 60, y: 140}, {x: 440, y: 140}, 
        {x: 130, y: 300}, {x: 370, y: 300} 
        ];
       
        for (var i = 0; i < coinPosition.length; i++) {
            if (coinPosition[i].x === this.coin.x) {
                coinPosition.splice(i, 1);
            }
        }
        // Randomly select a position from the array
        var newPosition = coinPosition[
        game.rnd.integerInRange(0, coinPosition.length-1)];
        // Set the new position of the coin
        this.coin.reset(newPosition.x, newPosition.y); 
    },
    
       
    addEnemy: function() {
        var enemy = this.enemies.getFirstDead();
        if (!enemy) {
            return;
        }
    
        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.world.centerX, 0);
        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = 100 + Phaser.Math.randomSign();
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    }, 
    
    
    
    playerDie: function () {
        game.state.start('main');
    },
    
 
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');

