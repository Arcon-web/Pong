var Wait = {};

var text;
var exitKey3;

Wait.create = function(){
	game.stage.backgroundColor = "#000";
	text = game.add.bitmapText(game.world.centerX, game.world.centerY, "bitfont", "Waiting for players", 64);
	text.anchor.setTo(0.5,0.5);

	exitKey3 = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
	
	Client.askNewPlayer();
}

Wait.update = function() {
	if (exitKey3.isDown) {
        game.state.start('menu');
    }
}

Wait.startGame = function(){
	game.state.start('play');
}
