var Wait = {};

var waitText;
var instructionText;
var upText;
var downText;
var exitText;

Wait.create = function(){
	game.stage.backgroundColor = "#000";
	waitText = game.add.bitmapText(game.world.centerX, 300, "bitfontwhite", "Waiting for players", 128);
	waitText.anchor.setTo(0.5,0.5);

	instructionText = game.add.bitmapText(game.world.centerX, 650, "bitfontwhite", "Instructions", 64);
	instructionText.anchor.setTo(0.5,0.5);

	upText = game.add.bitmapText(game.world.centerX, 750, "bitfontblue", "Blue: Up", 32);
	upText.anchor.setTo(0.5,0.5);

	downText = game.add.bitmapText(game.world.centerX, 800, "bitfontred", "Red: Down", 32);
	downText.anchor.setTo(0.5,0.5);

	exitText = game.add.bitmapText(game.world.centerX, 850, "bitfontgray", "Gray: Exit to Menu", 32);
	exitText.anchor.setTo(0.5,0.5);

	let exitKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    exitKey.onDown.addOnce(this.exit, this);
	
	Client.askNewPlayer();
}

Wait.startGame = function(){
	game.state.start('play');
}

Wait.exit = function() {
	Client.reloadPage();
}
