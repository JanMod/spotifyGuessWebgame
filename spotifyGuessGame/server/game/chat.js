class Chat {
    constructor(room) {
        this.room = room;


    }

    userMessage() {

    }

    joinChat(user) {

        console.log('room : ' + this.room.id);
        let self = this;
        user.socket.join(this.room.id);

        user.socket.on(this.room.id, data => {
            console.log(data);
            if (data.type === "chat") {
                user.socket.broadcast.to(self.room.id).emit('roomMessage', {
                    message: data.message,
                    name: data.user.name
                });
            }
            if (data.type === "spotify") {
                user.socket.broadcast.to(self.room.id).emit('roomMessage', {
                    message: data.message,
                    name: data.user.name
                });
            }
            if (data.type === "control") {

            }

        });

        user.socket.broadcast.to(this.room.id).emit('roomMessage', user.name + ' joined room.');
    }

}

module.exports = (room) => new Chat(room);