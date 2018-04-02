class Player extends User{
    constructor(name){
        super(name)
        //this.icon = TODO
    }

    changeName(name){
        this.name = name;
    }
    addPoints(points){
        this.points += points;
    }
}

module.exports = Player;