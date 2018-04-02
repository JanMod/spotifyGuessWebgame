class User {
    constructor(name) {
        this.name = name;
        this.id = require('uuid/v4')();
        //this.icon = TODO
    }

    send(msg) {

    }
}

module.exports = User;