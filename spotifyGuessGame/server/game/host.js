class Host extends User{
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
    addSpotifyToken(token){
        this.token= token;
    }

    playMusic(){

    }

    stopMusic(){

    }
}

module.exports = Player;