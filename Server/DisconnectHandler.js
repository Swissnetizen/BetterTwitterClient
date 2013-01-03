exports.Handler = function(socket) {
    socket.set('T', false);
    socket.set('Authorised', false);
    socket.set('Ready', false);
    return true;
};