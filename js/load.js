var Load = {};

Load.preload = function() {
    let loadingLabel = game.add.text(80, 150, 'loading...',{font: '30px Courier', fill: '#ffffff'});
    this.load.crossOrigin = "Anonymous";
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('ball', 'assets/ball.png');
    game.load.bitmapFont('bitfontwhite', 'assets/font_white.png', "assets/font_white.fnt");
    game.load.bitmapFont('bitfontred', 'assets/font_red.png', "assets/font_red.fnt");
    game.load.bitmapFont('bitfontyellow', 'assets/font_yellow.png', "assets/font_yellow.fnt");
    game.load.bitmapFont('bitfontgray', 'assets/font_gray.png', "assets/font_gray.fnt");
    game.load.bitmapFont('bitfontblue', 'assets/font_blue.png', "assets/font_blue.fnt");
}

Load.create = function() {
    game.state.start('menu');
}
