let endState = {

    create:function()
    {

        let nameLabel = game.add.text(80, 80, 'playerX won!',{font: '50px Arial', fill: '#ffffff'});

        let startLabel = game.add.text(80, game.world.height-80, 'press the "spacebar" key to start again',{font: '50px Arial', fill: '#ffffff'});

        let wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        wkey.onDown.addOnce(this.start, this);
        
    },
    start: function()
    {
        game.state.start('play');
    }

}