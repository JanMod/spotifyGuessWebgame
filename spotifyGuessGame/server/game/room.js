class Room{
    constructor(name, host){
        console.log('new room created');
        this.game = require('../game/game.js');
        this.name = name;
        this.users = [];
        this.max = 10;
        this.host = "Taric";
        this.currentUsers;
    }


    addUser(user){
        
    }

    removeUser(user){

    }
    changeName(name){
        this.name = name;
    }
}

module.exports = Room;