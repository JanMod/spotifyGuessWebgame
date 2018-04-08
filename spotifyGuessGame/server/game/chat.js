class Chat {
    constructor(ws, roomid) {

        ws.socket.on('roomid', msg => {
            console.log(msg);
            this.broadcast(msg);
        });

        console.log("chat created");
    }

    broadcast(msg) {
        this.users.forEach(user => {
            user.emit('roomMessage', msg);
        });
    }
    sendToUser(user, msg) {
        user.emit('roomMessage', msg);
    }

    adduser(user) {
        this.users = user;
    }
}

module.exports = (ws, id) => new Chat(ws, id);