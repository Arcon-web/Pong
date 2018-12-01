let loadState = {
    preload: function()
    {

        let loadingLabel = game.add.text(80, 150, 'loading...',{font: '30px Courier', fill: '#ffffff'});
        
        game.load.image('paddle', 'assets/paddle.png');
        game.load.image('ball', 'assets/ball.png');

    },

    create: function()
    {
        game.state.start('menu');
    }
}