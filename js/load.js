var Load = {};

Load.preload = function() {
    let loadingLabel = game.add.text(80, 150, 'loading...',{font: '30px Courier', fill: '#ffffff'});
    this.load.crossOrigin = "Anonymous";
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('ball', 'assets/ball.png');
}

Load.create = function() {
    game.state.start('menu');
}
