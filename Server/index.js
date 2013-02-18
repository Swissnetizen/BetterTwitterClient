//Dependences
var sio = require('socket.io');
var http = require("http");
var NewRequestHandler = require('./NewRequestHandler').Handler;
var DisconnectHandler = require('./DisconnectHandler').Handler;
var AuthorisationRequestHandler = require('./AuthorisationRequestHandler').Handler;
//The backlog of resources
var ResourceBackLog;
//Debug only
var ResourceRequestHandler = require("./ResourceRequestHandler").Handler;
//Reports the IP adress and Port that it will run on.
console.log('IP address: ' +  process.env.IP);
console.log('Port: ' + process.env.PORT);
//Creates and configures a new http.server instance.
//var io = sio.listen(http.createServer(ResourceRequestHandler).listen(process.env.PORT, process.env.IP, ResourceBackLog));

var Server = new http.Server(ResourceRequestHandler);
//Starts both the http and socket.io server.
var io = sio.listen(Server.listen(process.env.PORT, process.env.IP, ResourceBackLog, function(error) {
    if (error) {
        console.log("Error: " + error);
    } else if (!error) {
        console.log("Server started sucsessfully.");
        //Server.on('request', ResourceRequestHandler);
        console.log("Server now ready for requests.");
    }
}));



//Handles the connect and authorisation bit
io.sockets.on('connection', function(socket) {
    console.log('New Connection');
    socket.on('auth', function(Keys) {
    console.log('Autorisation Request Recived');
        AuthorisationRequestHandler(socket, Keys, function() {
            socket.on('NewRequest',  function(Request) {
                NewRequestHandler(socket, Request);
            });
            socket.on('diconnect', function() {
                DisconnectHandler(socket);
            });
        });
             
    });
});
