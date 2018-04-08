class Room {
    constructor(name, host, password, ws) {
        this.id = require('uuid/v4')();
        this.chat = require('../game/chat.js')(ws, this.id);
        //this.game = require('../game/game.js')();
        this.ws = ws;
        //this.ws.socket.join(this.id);
        this.name = name;
        this.password = password;
        this.users = [];
        this.max = 8;
        this.host = host;
        this.join(this.host);
        console.log('new room created');
        this.currentUsers = 0;

        this.broadcastChanges = ws.broadcastNewRoom;
    }

    join(user) {
        if (this.currentUsers < this.max) {
            this.users[user.id] = user;
            console.log(this.users.length);
            this.currentUsers++;
            this.sendMetadataUpdate()
            let self = this;
            user.socket.join(this.id);    
            setInterval(() => {
               // user.socket.emit('roomMessage', user.name);
            }, 2000)
            user.socket.on(this.id, data => {
                user.socket.broadcast.to(this.id).emit('roomMessage', data);
            });
            user.socket.broadcast.to(this.id).emit('roomMessage', user.name+ ' joined room.');
          //s  this.ws.socket.sockets.in(this.id).emit('roomMessage', user.name+ ' joined room.');
            return true;
        }
        return false;
    }

    removeUser(user) {
            delete this.users[user.id];
    }

    getMetadata() {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
            numberUser: this.currentUsers,
            max: this.max
        }
    }

    changeName(name) {
        this.name = name;
    }

    changeHost(user) {

    }

    subsribe() {

    }

    broadcast() {

    }

    sendMetadataUpdate() {
        this.broadcastChanges(this.getMetadata());
    }
}

module.exports = Room;