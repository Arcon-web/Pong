var End = {};

End.create = function() {
    let nameLabel = game.add.text(80, 80, winner+" won!" ,{font: '50px Arial', fill: '#ffffff'});

    let startLabel = game.add.text(80, game.world.height-80, 'press the "spacebar" key to start again',{font: '50px Arial', fill: '#ffffff'});

    let wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    wkey.onDown.addOnce(this.start, this);
}

End.start = function() {
    Client.disconnectAll();
    game.state.start('wait');
}
