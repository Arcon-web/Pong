var End = {};

var title;
var subtitle;
var timer;

End.create = function() {
    // Client.disconnectPlayer();

    title = game.add.bitmapText(game.world.centerX, 200, "bitfontwhite", winner+" won!", 128);
    title.anchor.x = 0.5;

    subtitle = game.add.bitmapText(game.world.centerX, 800, "bitfontwhite", "Press Start to play again", 64);
    subtitle.anchor.x = 0.5;

    let wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    wkey.onDown.addOnce(this.start, this);
}

End.update = function() {
    timer += game.time.elapsed;   
    if ( timer >= 500 )    {        
        timer -= 500;        
        subtitle.visible = !subtitle.visible;    
    }
}

End.start = function() {
    Client.disconnectPlayer();
    // game.state.start('wait');
}
