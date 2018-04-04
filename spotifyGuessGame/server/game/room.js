class Room {
    constructor(name, host, password, ws) {
        this.id = require('uuid/v4')();
        this.game = require('../game/game.js');

        this.name = name;
        this.password = password;
        this.users = [];
        this.max = 8;
        // this.host = host;
        console.log('new room created');
        this.currentUsers = 0;
        this.metadata = {
            id: this.id,
            name: this.name,
            password: this.password,
            numberUser: this.currentUsers,
            max: this.max
        }
        if (ws) {

            ws.sockets.on('connection', socket => {
                console.log(socket.id);
                socket.on('connect user', (id, cb) => {

                })
            })
        }
    }

    join(user) {
        if (this.currentUsers < this.max) {
            this.currentUsers++;
            this.metadata = {
                id: this.id,
                name: this.name,
                password: this.password,
                numberUser: this.currentUsers,
                max: this.max
            }
            this.users[user.id] = user;
            this.sendMetadataUpdate()
            let self = this;
            setInterval(() => {
                self.socket.in(self.id).emit('test', 'every 2 seconds');
            }, 2000)
            return true;
        }
        return false;
    }

    removeUser(user) {

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
        console.log(this.metadata);
        global.io.broadcastNewRoom(this.metadata);
    }
}

module.exports = Room;