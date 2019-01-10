var Client = {};
var clientID;
Client.socket = io.connect();


// from phaser
Client.askNewPlayer = function(){
    Client.socket.emit('newPlayer');
};

Client.moveUp = function(){
    Play.moveUp(clientID);
};

Client.moveDown = function(){
    Play.moveDown(clientID);
};

Client.moveNone = function(){
    Play.moveNone(clientID);
};

Client.movePaddle = function(y){
	Client.socket.emit('movePaddle', clientID, y);
};

Client.resetBall = function(y, angle){
	if (clientID == 1) {
		Client.socket.emit('resetBall', y, angle);
		Play.resetBall(y, angle);
	}
};

Client.updateScore = function(player){
	if (clientID == 1) {
		Client.socket.emit('updateScore', player);
	}
};

Client.resetScore = function(){
	Client.socket.emit('resetScore');
};

Client.disconnectPlayer = function(){
	location.reload();
	// Client.socket.emit('disconnectPlayer');
};



// from server
Client.socket.on('giveID', function(id){
	clientID = id;
});

Client.socket.on('startGame', function(id){
	Wait.startGame();
});

Client.socket.on('waitGame', function(){
	Play.waitGame();
});

Client.socket.on('movePaddle', function(id, y){
	Play.movePaddle(id, y);
});

Client.socket.on('resetBall', function(y, angle){
	Play.resetBall(y, angle);
});

Client.socket.on('updateScore', function(score1, score2){
	Play.updateScore(score1, score2);
});

Client.socket.on('winGame', function(player){
	Play.winGame(player);
});

Client.socket.on('disconnectPlayer', function(player){
	location.reload();
});