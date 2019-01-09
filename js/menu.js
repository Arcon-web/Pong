var Menu = {};

var title;
var subtitle1;
var subtitle2;
var subtitle3;
var timer = 0;
var exitKey2;

Menu.create = function() {
    title = game.add.bitmapText(game.world.centerX, 300, "bitfontwhite", "PONG", 256);
    title.anchor.x = 0.5;

    subtitle1 = game.add.bitmapText(game.world.centerX - 250, 800, "bitfontwhite", "Press", 64);
    subtitle1.anchor.x = 0.5;

    subtitle2 = game.add.bitmapText(game.world.centerX - 50, 800, "bitfontred", "Red", 64);
    subtitle2.anchor.x = 0.5;

    subtitle3 = game.add.bitmapText(game.world.centerX + 200, 800, "bitfontwhite", "to Start", 64);
    subtitle3.anchor.x = 0.5;

    exitKey2 = game.input.keyboard.addKey(Phaser.Keyboard.R);

    let wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.start, this);
}

Menu.update = function() {
    timer += game.time.elapsed;   
    if ( timer >= 500 ) {        
        timer -= 500;        
        subtitle1.visible = !subtitle1.visible;
        subtitle2.visible = !subtitle2.visible;
        subtitle3.visible = !subtitle3.visible;
    }

    if (exitKey2.isDown) {
        Client.exit();
    }
}

Menu.start = function(){
    game.state.start('wait');
}
