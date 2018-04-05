class Room {
    constructor(name, host, password, broadcastNewRoom) {
        this.id = require('uuid/v4')();
        this.game = require('../game/game.js');

        this.name = name;
        this.password = password;
        this.users = [];
        this.max = 8;
        // this.host = host;
        console.log('new room created');
        this.currentUsers = 0;

        this.broadcastNewRoom = broadcastNewRoom;
    }

    join(user) {
        if (this.currentUsers < this.max) {
            this.currentUsers++;

            this.users[user.id] = user;
            this.sendMetadataUpdate()
            let self = this;
            setInterval(() => {
                //self.socket.in(self.id).emit('test', 'every 2 seconds');
            }, 2000)
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
        this.broadcastNewRoom(this.getMetadata());
    }
}

module.exports = Room;