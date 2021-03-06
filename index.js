var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

//generic host and port initializaion
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");
 
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
var users = 0;
io.on('connection', function(socket){
    console.log('a user connected');
    users++;
    io.emit('online', users);
    socket.on('disconnect', function(){
        users--;
        console.log('user disconnected');
        io.emit('online', users);
    });
    
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg );
        io.emit('chat message',msg);
    });
    
    socket.on('nickName', function(nick){
       io.emit('user joined', nick); 
    });
    
});

http.listen(app.get('port'), app.get('ip'), function(){
    console.log('listening on *:' + app.get('po'));
    
});