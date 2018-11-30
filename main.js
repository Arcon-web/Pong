var game;

function startGame() {
	game = new Phaser.Game(320, 480, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
	console.log("Game created!");
}

var ball;

function preload(){
    
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
  
    
    

}
function update(){

}


