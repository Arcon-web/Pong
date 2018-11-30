var game;

function startGame() {
	game = new Phaser.Game(320, 480, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
	console.log("Game created!");
}

var ball;

function preload(){
    game.load.image('ball', 'assets/ball.png');
    game.stage.backgroundColor = '#cccccc';
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
  
    
    ball = game.add.sprite(game.world.centerX,game.world.centerY,'ball');
    
    game.physics.arcade.enable(ball);

    ball.body.bounce.y = 0.7;
    ball.body.gravity.y = 600;
    ball.body.collideWorldBounds = true;

    name = game.add.text(game.world.centerX, game.world.centerY,"Mats",{
        font : "32px Gabriella",
        fill : getRandomColor(),
        align:"center"
    })

}
function update(){

    ball.body.velocity.x = 0;
    game.input.onDown.add(jump_up, this);

    if(ball.body.blocked.down){
        name = game.add.text(game.world.centerX, game.world.centerY,"Mats",{
            font : "32px Gabriella",
            fill : getRandomColor(),
            align:"center"
        })
        
    }
}

function jump_up(){
    ball.body.velocity.y = -200;
}

function getRandomColor(){
    var letters = '01234156789ABCDEF';
    color='#';
    for(var i = 0; i<6; i++){
        color +=letters[Math.floor(Math.random()*16)];

    }
    return color;
}
