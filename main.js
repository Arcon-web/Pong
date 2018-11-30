var game;

function startGame() {
	game = new Phaser.Game(800, 680, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
	console.log("Game created!");
}

var ball;
var paddle1;
var paddle2;

function preload(){
    game.load.image('paddle', 'assets/paddle.png');
}

function create()
{
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#000";
    paddle1 = create_paddle(0,game.world.centerY);
    paddle2 = create_paddle(game.world.width-16,game.world.centerY);

}

function update()
{

}

function create_paddle(x,y)
{
    var paddle = game.add.sprite(x,y,'paddle')
    paddle.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    return paddle;
}

