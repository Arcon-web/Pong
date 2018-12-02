var Client = {};
var clientID;
Client.socket = io.connect();



Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.moveUp = function(){
    Play.move_up(clientID);
};

Client.moveDown = function(){
    Play.move_down(clientID);
};

Client.moveNone = function(){
    Play.move_none(clientID);
};

Client.movePaddle = function(y){
	Client.socket.emit('move_paddle', clientID, y);
};



Client.socket.on('giveID',function(id){
	clientID = id;
});

Client.socket.on('startGame',function(id){
	Wait.start_game();
});

Client.socket.on('waitGame',function(){
	Play.wait_game();
});

Client.socket.on('movePaddle',function(id, y){
	Play.move_paddle(id, y);
});
