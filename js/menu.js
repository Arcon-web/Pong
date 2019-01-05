var Menu = {};

var title;
var subtitle;
var timer = 0;

Menu.create = function() {
    title = game.add.bitmapText(game.world.centerX, 300, "bitfont", "PONG", 256);
    title.anchor.x = 0.5;

    subtitle = game.add.bitmapText(game.world.centerX, 800, "bitfont", "Press Start", 64);
    subtitle.anchor.x = 0.5;

    let wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    wkey.onDown.addOnce(this.start, this);
}

Menu.update = function() {
    timer += game.time.elapsed;   
    if ( timer >= 500 )    {        
        timer -= 500;        
        subtitle.visible = !subtitle.visible;    
    }
}

Menu.start = function(){
    game.state.start('wait');
}
