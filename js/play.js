var Play = {};

let upKey;
let downKey;
let exitKey1;

let paddle1;
let paddle2;
let paddleVelocity = 600;

let ball;
let ballLaunched;
let ballVelocity = 900;
let ballRandomStartingAngle = [-60, 60, 120, 240];
let ballStartDelay = 1;

let winner;

var score1Text;
var score2Text;
var score3Text;

Play.create = function() {
    //game settings
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#000";

    //controls for paddle
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    exitKey1 = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    //create the ball
    ball = this.createBall(game.world.centerX,game.world.centerY);

    //create paddles
    Play.createPaddle1();
    Play.createPaddle2();

    //movement of the ball
    ball.visible = false;
    game.time.events.add(Phaser.Timer.SECOND * ballStartDelay, this.launchBall, this, 60);

    //text rendering
    score1Text = game.add.bitmapText(game.world.centerX-200, 200, "bitfont", "0", 128);
    score2Text = game.add.bitmapText(game.world.centerX+200, 200, "bitfont", "0", 128);
    score1Text.anchor.x = 0.5;
    score2Text.anchor.x = 0.5;

    //set score
    Client.resetScore();
    score1Text.setText = "0";
    score2Text.setText = "0";
}

Play.update = function() {
    if (upKey.isDown) {
        Client.moveUp();
    }
    else if (downKey.isDown) {
        Client.moveDown();
    }
    else {
        Client.moveNone();
    }

    if (exitKey1.isDown) {
        game.state.start('menu');
    }

    //collisions ball with paddles
    game.physics.arcade.collide(paddle1,ball);
    game.physics.arcade.collide(paddle2,ball);

    if (ball.body.blocked.left)
    {
        Client.resetBall(game.rnd.between(0, game.world.height), game.rnd.pick(ballRandomStartingAngle));
        Client.updateScore('2');
    }
    else if (ball.body.blocked.right)
    {
        Client.resetBall(game.rnd.between(0, game.world.height), game.rnd.pick(ballRandomStartingAngle));
        Client.updateScore('1');
    }
}

Play.createPaddle1 = function() {
    paddle1 = game.add.sprite(0,game.world.centerY,'paddle');
    paddle1.scale.setTo(0.5);
    paddle1.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle1);
    paddle1.body.collideWorldBounds = true;
    paddle1.body.immovable=true;
    return paddle1;
}

Play.createPaddle2 = function() {
    paddle2 = game.add.sprite(game.world.width-8,game.world.centerY,'paddle');
    paddle2.scale.setTo(0.5);
    paddle2.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle2);
    paddle2.body.collideWorldBounds = true;
    paddle2.body.immovable=true;
    return paddle2;
}

Play.createBall = function(x,y) {
    let ball = game.add.sprite(x,y,'ball') 
    ball.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1,1);

    return ball;
}

Play.moveUp = function(id) {
    if (id == 1) {
        paddle1.body.velocity.y = -paddleVelocity;
        Client.movePaddle(paddle1.y);
    }
    if (id == 2) {
        paddle2.body.velocity.y = -paddleVelocity;
        Client.movePaddle(paddle2.y);
    }
}

Play.moveDown = function(id) {
    if (id == 1) {
        paddle1.body.velocity.y = paddleVelocity;
        Client.movePaddle(paddle1.y);
    }
    if (id == 2) {
        paddle2.body.velocity.y = paddleVelocity;
        Client.movePaddle(paddle2.y);
    }
}

Play.moveNone = function(id) {
    if (id == 1) {
        paddle1.body.velocity.y = 0;
        Client.movePaddle(paddle1.y);
    }
    if (id == 2) {
        paddle2.body.velocity.y = 0;
        Client.movePaddle(paddle2.y);
    }
}

Play.movePaddle = function(id, y) {
    if (id == 1) {
        paddle1.y = y;
    }
    if (id == 2) {
        paddle2.y = y;
    }
}

Play.resetBall = function (y, angle) {
    ball.reset(game.world.centerX, y);
    ball.visible = false;
    game.time.events.add(Phaser.Timer.SECOND * ballStartDelay, this.launchBall, this, angle);
}

Play.launchBall = function(angle) {
    ball.visible = true;
    game.physics.arcade.velocityFromAngle(angle, ballVelocity, ball.body.velocity);
}

Play.updateScore = function (score1, score2) {
    score1Text.text = score1;
    score2Text.text = score2;
}

Play.winGame = function (player) {
    if (player == "player1") {
        winner = "player1";
    }
    if (player == "player2") {
        winner = "player2";
    }
    game.state.start('end');
}

Play.waitGame = function () {
    game.state.start('wait');
}