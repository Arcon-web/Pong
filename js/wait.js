var Wait = {};

Wait.create = function(){
	game.stage.backgroundColor = "#000";
	var style = { fill: "#fff", font: '60px Roboto' };
	var text = game.add.text(0, 0, "Waiting for players", style);
	text.anchor.setTo(0.5,0.5);
    text.x = game.world.centerX;
    text.y = game.world.centerY;

    Client.askNewPlayer();
}

Wait.start_game = function(){
	game.state.start('play');
}
