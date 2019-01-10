var Menu = {};

var title;
var subtitle1;
var subtitle2;
var subtitle3;
var timer = 0;

Menu.create = function() {
    title = game.add.bitmapText(game.world.centerX, 300, "bitfontwhite", "PONG", 256);
    title.anchor.x = 0.5;

    subtitle1 = game.add.bitmapText(game.world.centerX - 290, 800, "bitfontwhite", "Press", 64);
    subtitle1.anchor.x = 0.5;

    subtitle2 = game.add.bitmapText(game.world.centerX - 50, 800, "bitfontyellow", "Yellow", 64);
    subtitle2.anchor.x = 0.5;

    subtitle3 = game.add.bitmapText(game.world.centerX + 240, 800, "bitfontwhite", "to Start", 64);
    subtitle3.anchor.x = 0.5;

    let exitKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    exitKey.onDown.addOnce(this.exit, this);

    let startKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    startKey.onDown.addOnce(this.start, this);
}

Menu.update = function() {
    timer += game.time.elapsed;   
    if ( timer >= 500 ) {        
        timer -= 500;        
        subtitle1.visible = !subtitle1.visible;
        subtitle2.visible = !subtitle2.visible;
        subtitle3.visible = !subtitle3.visible;
    }
}

Menu.start = function() {
    game.state.start('wait');
}

Menu.exit = function() {
    window.location = "https://platform.arconconsole.be/";
}
