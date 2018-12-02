let game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'gameDiv');


game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('end', endState);
game.state.add('play', playState);


game.state.start('boot');
