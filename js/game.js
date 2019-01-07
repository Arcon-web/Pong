//let game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'gameDiv');
let game = new Phaser.Game(1920, 1200, Phaser.AUTO, 'gameDiv');


game.state.add('boot', Boot);
game.state.add('load', Load);
game.state.add('menu', Menu);
game.state.add('end', End);
game.state.add('play', Play);
game.state.add('wait', Wait);


game.state.start('boot');
