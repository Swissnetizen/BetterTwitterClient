//Dependecies.
var Twit = require('twit');
//Creates a Twit Object.
var CreateTwitObject = function(Keys) {
    var Result;
    try {
        Result = new Twit(Keys);
    } catch (e) {
        throw 'Error Authenticating: '.concat(e);
    }
    return Result;
};


exports.Handler = function(socket, Keys, callback) {
    socket.set('T', CreateTwitObject(Keys), function() {
        socket.emit('Ready');
        socket.on('Ready', function() {
            console.log('Client Says: Ready');
            socket.set('Ready', true, callback);
        });
    });
};


