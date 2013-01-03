//Dependences
var sio = require('socket.io');
var NewRequestHandler = require('./NewRequestHandler').Handler;
var DisconnectHandler = require('./DiconnectHandler').Handler;
var AuthorisationRequestHandler = require('./AuthorisationRequestHandler').Handler;
//Starts Listening for requests.
var io = sio.listen(80);
//Handles the connect and authorisation bit
io.sockets.on('connection', function(socket) {
    socket.on('auth', function(Keys) {
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
