var Client = {};
var clientID;
Client.socket = io.connect();



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

Client.resetBall = function(y){
	if (clientID == 1) {
		Client.socket.emit('resetBall', y);
		Play.resetBall(y);
	}
};

Client.updateScore = function(score){
	Client.socket.emit('updateScore', score);
};



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

Client.socket.on('resetBall', function(y){
	Play.resetBall(y);
});

Client.socket.on('updateScore', function(score1, score2){
	Play.updateScore(score1, score2);
});