var Wait = {};

var text;

Wait.create = function(){
	game.stage.backgroundColor = "#000";
	text = game.add.bitmapText(game.world.centerX, game.world.centerY, "bitfont", "Waiting for players", 64);
	text.anchor.setTo(0.5,0.5);
	
	Client.askNewPlayer();
}

Wait.startGame = function(){
	game.state.start('play');
}
