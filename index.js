var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var cookieParser = require('cookie-parser');
app.use(cookieParser());

let visited = false;
let visitors = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Handle connection
io.on('connection', function(socket){

  if(!visited){
    io.emit('first-visit',true)
  }else{
    let userName = 'TestUser';
    io.emit('not-first-visit', 'Welcome back, ' + userName);
  }
  
  //Handle user info from client
  socket.on('client-username', function(data){
    console.log("From client: " + data);
  });

});

//Listen to port:
http.listen(process.env.PORT||3000);
