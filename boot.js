let bootState = {
    create: function()
    {
        game.physics.startSystem(Phaser.Physics.AUTO);

        game.state.start('load');
    }
}