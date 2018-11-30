var game;

function startGame() {
	game = new Phaser.Game(800, 680, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
	console.log("Game created!");
}

var ball;
var paddle1;
var paddle2;
var upKey;
var downKey;
var paddle_velocity = 5;
var ball_launched;
var ball_velocity;

function preload(){
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('ball', 'assets/ball.png');

}

function create()
{
    //game settings
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#000";

    //controls for paddle
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    
    //creation of paddles
    paddle1 = create_paddle(0,game.world.centerY);
    paddle2 = create_paddle(game.world.width-8,game.world.centerY);
    paddle1.scale.setTo(0.5);
    paddle2.scale.setTo(0.5);

    //create the ball
    ball = create_ball(game.world.centerX,game.world.centerY);

    //movement of the ball
    ball_launched = false;
    ball_velocity = 400;  

    //start ball movement
    game.input.onDown.add(launch_ball, this);

}

function update()
{
    control_paddle(paddle1,game.input.y);

    //collisions ball with paddles
    game.physics.arcade.collide(paddle1,ball);
    game.physics.arcade.collide(paddle2,ball);
    //collisions ball with walls
    if(ball.body.blocked.left)
    {
        console.log('player 2 scores!');
    }else if(ball.body.blocked.right)
    {
        console.log('player 1 scores!');
    }
}

function create_paddle(x,y)
{
    var paddle = game.add.sprite(x,y,'paddle')
    paddle.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    paddle.body.immovable=true;
    return paddle;
}

function create_ball(x,y)   
{ 
    var ball = game.add.sprite(x,y,'ball') 
    ball.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1,1);

    return ball;
}


function control_paddle(paddle,y)
{
    
    if(upKey.isDown)
    {
        paddle.y-=paddle_velocity;
    }else if(downKey.isDown)
    {
        paddle.y+=paddle_velocity;
    }
}

function launch_ball()
{
    if(ball_launched)
    {
        ball.x = game.world.centerX;
        ball.y = game.world.centerY;
        ball.body.velocity.setTo(0,0);
        ball_launched = false;
    }else
    {
        ball.body.velocity.x  = ball_velocity;
        ball.body.velocity.y  = ball_velocity;
        ball_launched = true;

    }
}

