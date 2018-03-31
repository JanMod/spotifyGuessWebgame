class Room {
    constructor(name, host) {
        this.id = require('uuid/v4')();
        this.game = require('../game/game.js');
        this.name = name;
        this.password = password;
        this.users = [];
        this.max = 8;
        this.host = host;
        this.currentUsers = 0;
        console.log('new room created');
    }

    addUser(user) {
        if (this.currentUsers <= this.max) {
            this.currentUsers++;
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
}

module.exports = Room;