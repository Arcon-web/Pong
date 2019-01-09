var End = {};

var title;
var subtitle1;
var subtitle2;
var subtitle3;
var timer;

End.create = function() {
    // Client.disconnectPlayer();

    title = game.add.bitmapText(game.world.centerX, 200, "bitfontwhite", winner+" won!", 128);
    title.anchor.x = 0.5;

    subtitle1 = game.add.bitmapText(game.world.centerX - 300, 800, "bitfontwhite", "Press", 64);
    subtitle1.anchor.x = 0.5;

    subtitle2 = game.add.bitmapText(game.world.centerX - 100, 800, "bitfontred", "Red", 64);
    subtitle2.anchor.x = 0.5;

    subtitle3 = game.add.bitmapText(game.world.centerX + 190, 800, "bitfontwhite", "to Restart", 64);
    subtitle3.anchor.x = 0.5;

    let wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.start, this);
}

End.update = function() {
    timer += game.time.elapsed;   
    if ( timer >= 500 )    {        
        timer -= 500;        
        subtitle1.visible = !subtitle1.visible;
        subtitle2.visible = !subtitle2.visible;
        subtitle3.visible = !subtitle3.visible;
    }
}

End.start = function() {
    Client.disconnectPlayer();
    // game.state.start('wait');
}
