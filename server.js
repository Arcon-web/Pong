var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.player1 = null;
server.player2 = null;

server.score1 = 0;
server.score2 = 0;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection',function(socket){

    socket.on('newPlayer',function(){
        if (server.player1 == null) {
            // player 1
            console.log('Player 1 joined');
            server.player1 = socket.id;
            socket.player = {
                id: 1
            };
            socket.emit('giveID', 1);

            if (server.player2 != null) {
                socket.emit('createPaddle2');
            }
            socket.emit('createPaddle1');
            socket.broadcast.emit('createPaddle1');
        }
        else if (server.player1 != null && server.player2 == null) {
            // player 2
            console.log('Player 2 joined');
            server.player2 = socket.id;
            socket.player = {
                id: 2
            };
            socket.emit('giveID', 2);

            socket.emit('createPaddle1');
            socket.emit('createPaddle2');
            socket.broadcast.emit('createPaddle2');
        }
        else {
            // spectator
            console.log('A spectator joined');
            socket.player = {
                id: 3
            };
        }

        // start game when there are 2 players
        if (server.player1 != null && server.player2 != null) {
            io.emit('startGame');
        }

        socket.on('movePaddle',function(id, y){
            socket.broadcast.emit('movePaddle', id, y);
        });

        socket.on('resetBall',function(y, angle){
            socket.broadcast.emit('resetBall', y, angle);
        });

        socket.on('updateScore',function(player){
            if (player == '1') {
                server.score1 += 1;
            }

            if (player == '2') {
                server.score2 += 1;
            }

            io.emit('updateScore', server.score1, server.score2);
        });

        socket.on('resetScore',function(){
            server.score1 = 0;
            server.score2 = 0;
        });

        socket.on('disconnect',function(){
            if (socket.player.id == 1) {
                console.log('Player 1 disconnected');
                socket.broadcast.emit('waitGame');
                server.player1 = null;
                server.player2 = null;
            }
            else if (socket.player.id == 2) {
                console.log('Player 2 disconnected');
                socket.broadcast.emit('waitGame');
                server.player1 = null;
                server.player2 = null;
            }
            else {
                console.log('A spectator disconnected');
            }
        });

        socket.on('disconnectAll',function(){
            console.log('Reset game');
            server.player1 = null;
            server.player2 = null;
        });
    });
});
