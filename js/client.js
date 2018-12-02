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



Client.socket.on('giveID',function(id){
	clientID = id;
});

Client.socket.on('startGame',function(id){
	Wait.startGame();
});

Client.socket.on('waitGame',function(){
	Play.waitGame();
});

Client.socket.on('movePaddle',function(id, y){
	Play.movePaddle(id, y);
});
