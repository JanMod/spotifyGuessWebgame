class User {
    constructor(name, ws) {
        this.name = name;
        this.id = require('uuid/v4')();
        //this.icon = TODO
        this.socket = {};

        global.io.sockets.on('connection', socket => {
            socket.on(this.id, (data, cb) => {
                console.log("User");
                this.socket = socket;
            })
        })


    }



    disconnectWs() {
        this.socket = {};
    }

    send(msg) {

    }
}

module.exports = User;