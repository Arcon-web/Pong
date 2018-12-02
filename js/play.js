var Play = {};

let upKey;
let downKey;

let paddle1;
let paddle2;
let paddle_velocity = 600;

let ball;
let ball_launched;
let ballVelocity= 900;
let ballRandomStartingAngleLeft= [-60, 60];
let ballRandomStartingAngleRight= [-60, 60];
let ballStartDelay= 1;

let scoreToWin = 5;
let winner;

let score1_text;
let score2_text;

let score2 = 0;
let score1 = 0;

Play.create = function() {
    //game settings
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#000";

    //controls for paddle
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    //create the ball
    ball = this.create_ball(game.world.centerX,game.world.centerY);

    Play.create_paddle1();
    Play.create_paddle2();

    //movement of the ball
    ball.visible = false;
    game.time.events.add(Phaser.Timer.SECOND * ballStartDelay, this.launch_ball, this);
    

    //text rendering
    score1_text = game.add.text(128,128,'0',{font: "64px Gabriella", fill:"#ffffff", align: "center"});
    score2_text = game.add.text(game.world.width - 128,128,'0',{font: "64px Gabriella", fill:"#ffffff", align: "center"});
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

    //collisions ball with paddles
    game.physics.arcade.collide(paddle1,ball);
    game.physics.arcade.collide(paddle2,ball);

    //adding scores when hit the wall
    score1_text.text = score1;
    score2_text.text = score2;

    if (ball.body.blocked.left)
    {
        score2 +=1;
        this.resetBall();
    }
    else if (ball.body.blocked.right)
    {
        score1 +=1;
        this.resetBall();
    }

    if(score2 == scoreToWin)
    {
        game.state.start('end');
        winner = "player2";
    }
    if(score1 == scoreToWin)
    {
        game.state.start('end');
        winner = "player1";
    }
}

Play.create_paddle1 = function() {
    paddle1 = game.add.sprite(0,game.world.centerY,'paddle');
    paddle1.scale.setTo(0.5);
    paddle1.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle1);
    paddle1.body.collideWorldBounds = true;
    paddle1.body.immovable=true;
    return paddle1;
}

Play.create_paddle2 = function() {
    paddle2 = game.add.sprite(game.world.width-8,game.world.centerY,'paddle');
    paddle2.scale.setTo(0.5);
    paddle2.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle2);
    paddle2.body.collideWorldBounds = true;
    paddle2.body.immovable=true;
    return paddle2;
}

Play.create_ball = function(x,y) { 
    let ball = game.add.sprite(x,y,'ball') 
    ball.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1,1);

    return ball;
}

Play.move_up = function(id) {
    if (id == 1) {
        paddle1.body.velocity.y = -paddle_velocity;
        Client.movePaddle(paddle1.y);
    }
    if (id == 2) {
        paddle2.body.velocity.y = -paddle_velocity;
        Client.movePaddle(paddle2.y);
    }
}

Play.move_down = function(id) {
    if (id == 1) {
        paddle1.body.velocity.y = paddle_velocity;
        Client.movePaddle(paddle1.y);
    }
    if (id == 2) {
        paddle2.body.velocity.y = paddle_velocity;
        Client.movePaddle(paddle2.y);
    }
}

Play.move_none = function(id) {
    if (id == 1) {
        paddle1.body.velocity.y = 0;
        Client.movePaddle(paddle1.y);
    }
    if (id == 2) {
        paddle2.body.velocity.y = 0;
        Client.movePaddle(paddle2.y);
    }
}

Play.move_paddle = function(id, y) {
    if (id == 1) {
        paddle1.y = y;
    }
    if (id == 2) {
        paddle2.y = y;
    }
}

Play.launch_ball = function() {
    ball.visible = true;
    let randomAngle = game.rnd.pick(ballRandomStartingAngleRight.concat(ballRandomStartingAngleLeft));
    
    game.physics.arcade.velocityFromAngle(randomAngle, ballVelocity, ball.body.velocity);
}

Play.resetBall = function () {
    ball.reset(game.world.centerX, game.rnd.between(0, game.world.height));
    ball.visible = false;
    game.time.events.add(Phaser.Timer.SECOND * ballStartDelay, this.launch_ball, this);
}

Play.wait_game = function () {
    game.state.start('wait');
}