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
var velocity = 5;


function preload(){
    game.load.image('paddle', 'assets/paddle.png');
}

function create()
{
    //controls for paddle
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#000";

    //creation of paddles
    paddle1 = create_paddle(0,game.world.centerY);
    paddle2 = create_paddle(game.world.width-8,game.world.centerY);
    paddle1.scale.setTo(0.5);
    paddle2.scale.setTo(0.5);


}

function update()
{
    control_paddle(paddle1,game.input.y);


}

function create_paddle(x,y)
{
    var paddle = game.add.sprite(x,y,'paddle')
    paddle.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    return paddle;
}
function control_paddle(paddle,y)
{
    
    if(upKey.isDown)
    {
        paddle.y-=velocity;
    }else if(downKey.isDown)
    {
        paddle.y+=velocity;
    }
}

