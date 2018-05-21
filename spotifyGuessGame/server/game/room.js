class Room {
    constructor(name, host, password, ws, rooms) {
        this.rooms = rooms;
        this.id = require('uuid/v4')();

        //this.game = require('../game/game.js')();
        this.ws = ws;
        //this.ws.socket.join(this.id);
        this.name = name;
        this.password = password;
        this.users = [];
        this.max = 8;
        this.broadcastChanges = ws.broadcastNewRoom;
        this.currentUsers = 0;
        this.host = host;
        this.host.isHost = true;
        this.chat = require('../game/chat.js')(this);
        this.join(this.host);

    }

    join(user) {
        if (this.checkIfAllreadyJoined(user)) {
            this.chat.joinChat(user);
        }
        else if (this.currentUsers < this.max) {
            this.users[user.id] = user;
            this.currentUsers++;
            this.joinRoom(user);
            this.chat.joinChat(user);

            //s  this.ws.socket.sockets.in(this.id).emit('roomMessage', user.name+ ' joined room.');
            this.sendMetadataUpdate()
            return true;
        }

        return false;
    }

    removeUser(user) {
        delete this.users[user.id];
        this.currentUsers--;


        if (this.currentUsers === 0) {
            delete this.rooms[this.id];
        }
        this.sendMetadataUpdate();
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

    joinRoom(user) {

        let self = this;
        user.room = this;


    }

    changeName(name) {
        this.name = name;
    }

    changeHost(user) {

    }

    checkIfAllreadyJoined(user) {
        for (let key in this.users) {
            if (user.id === key) {
                return true;
            }
        }
        return false;
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