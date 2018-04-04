var socket = require('socket.io');

module.exports = function (app) {
    var _io = global.io = socket(app)

    _io.sockets.on('connection', socket => {
        console.log(socket.id);
        socket.join('newRoom');
        socket.emit('newRoom', {  });
        socket.on('connect user', (id,cb)=>{

        })
    })

    _io.broadcastNewRoom =  function (room) {
        _io.sockets.to('newRoom').emit('newRoom', room);
    }
}