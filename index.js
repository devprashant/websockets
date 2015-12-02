var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

//generic host and port initializaion
var host = process.env.IP;
var port = process.env.PORT;

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg );
        io.emit('chat message',msg);
    });
    
});



http.listen(port, function(){
    console.log('listening on *:' + port);
    
});