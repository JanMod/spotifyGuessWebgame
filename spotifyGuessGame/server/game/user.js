class User {
    constructor(name) {
        this.name = name;
        this.id = require('uuid/v4')();
        //this.icon = TODO
    }



    disconnectWs() {
        this.socket = {};
    }

    send(msg) {

    }

    setSocket(socket){
        this.socket = socket;
    }
}

module.exports = User;