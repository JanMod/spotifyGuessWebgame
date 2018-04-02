var socket = require('socket.io');

module.exports = function (app) {
    var _io = global.io = socket(app)

    _io.sockets.on('connection', socket => {
        console.log(socket.id);
        socket.join('newRoom');
        socket.emit('newRoom', { nothing: 'lul' });
    })

    _io.broadcastNewRoom =  function (room) {
        _io.sockets.to('newRoom').emit('newRoom', room);
    }
}