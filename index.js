var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

//generic host and port initializaion
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");
 
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
var devices = 0;
io.on('connection', function(socket){
    console.log('a device connected');
      devices++;
      io.emit('online', devices);
      
    socket.on('trigger', function(msg){
       io.emit('trigger',msg); 
    });
    
    socket.on('disconnect', function(){
        devices--;
        console.log('a device disconnected');
        io.emit('online', devices);
    });
    
});

http.listen(app.get('port'), app.get('ip'), function(){
    console.log('listening on *:' + app.get('po'));
    
});