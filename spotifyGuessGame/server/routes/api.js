const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Room = require('../game/room.js');
const User = require('../game/user.js');
const jwt = require('jsonwebtoken');

//store rooms and users in array dictionary
var rooms = [];
var users = [];

const spotifyApi = require('../spotify/spotifyApi.js')(router, users);

var ws = {};

var connectSocket = function (_socket) {
    ws.socket = _socket;
    let self = this;
    ws.socket.sockets.on('connection', socket => {
        socket.join('newRoom');
        socket.on('setUserWs', (data, cb) => {
            console.log(data.id);
            let callback = cb;
            jwt.verify(data.id, 'azerbajan', (err, authData) => {
                if (err) {
                    console.log(err);
                    callback(false);
                } else {
                    if (isUserCreated(authData.user.id)) {
                        socket.userId = authData.user.id;
                        users[authData.user.id].setSocket(socket);
                        if (cb) {
                            callback(true);
                        }
                    } else {
                        if (cb) {
                            callback(false);
                        }
                    }
                }
            })
        })
        socket.on('disconnect', function () {
            let user = users[this.userId];
            console.log(user);

            if (user) {
                user.disconnectWs();
                if (user.room) {
                    //        user.room.removeUser(user);
                    //        delete users[this.userId];
                }
                //        delete users[this.userId];
            }
        })
    })

    ws.socket.on('roomid', msg => {
        this.broadcast(msg);
    });

    ws.broadcastNewRoom = function (room) {
        ws.socket.sockets.to('newRoom').emit('newRoom', room);
    }

}



// Error handling
const sendError = (err, status, res) => {
    response.status = status;
    response.message = err;
    res.status(status).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.get('/user', verifyToken, (req, res) => {
    jwt.verify(req.token, 'azerbajan', (err, authData) => {
        if (err) {
            sendError('Acess denied', 403, res);
        } else {
            let user = users[authData.user.id];
            if (!user) {
                sendError('User has been deleted', 401, res);
            } else {
                res.json({
                    user: {
                        id: user.id,
                        name: user.name
                    },
                    room: user.room ? user.room.id : null
                });
            }
        }
    })
})

router.post('/createUser', (req, res) => {
    let name = req.body.name;
    if (!name) {
        sendError('No username found', 404, res);
        return;
    }
    if (isUserNameAvailable(req.body.name)) {
        let user = new User(req.body.name);
        users[user.id] = user;
        jwt.sign({ user: user }, 'azerbajan', (err, token) => {
            user.token = token;
            res.json(user);
        })

    } else {
        sendError('Username is already taken', 400, res);
    }

});

router.post('/createRoom', verifyToken, (req, res) => {


    jwt.verify(req.token, 'azerbajan', (err, authData) => {
        if (err) {
            sendError('Acess denied', 403, res);
        } else {
            let user = users[authData.user.id];
            createNewRoom(req.body.data, user, result => {
                response.message = "Room created";
                response.data = result;
                res.json(response);
            }, err => {
                sendError(err, 500, res);
            });
        }
    });
});

router.get('/Rooms', verifyToken, (req, res) => {
    jwt.verify(req.token, 'azerbajan', (err, authData) => {
        if (err) {
            sendError('Acess denied', 403, res);
        } else {
            response.data = rooms;
            var output = []
            for (var key in rooms) {
                if (rooms.hasOwnProperty(key)) {
                    output.push(rooms[key].getMetadata());
                }
            }
            res.send(output);
        }
    })
});

router.post('/joinRoom', verifyToken, (req, res) => {

    jwt.verify(req.token, 'azerbajan', (err, authData) => {
        if (err) {
            sendError('Acess denied', 403, res);
        } else {
            let user = users[authData.user.id];

            if (user) {
                let room = rooms[req.body.id];
                if (room) {
                    room.join(user);
                    res.json(req.body);
                } else {
                    sendError('Room not found', 404, res);
                }
            } else {
                sendError('User not found', 404, res);
            }
        }
    })
});

router.post('/joinRoom/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'azerbajan', (err, authData) => {
        if (err) {
            sendError('Acess denied', 403, res);
        } else {
            let user = users[authData.user.id];

            if (user) {
                if (!user.socket) {
                    res.json({
                        message: "reconnected",
                        room: user.room.id
                    }
                    );
                    return;
                }
                let room = rooms[req.params.id];
                if (room) {
                    room.join(user);
                    res.json({
                        message: "reconnected",
                        room: user.room.id
                    }
                    );
                } else {
                    sendError('Room not found', 404, res);
                }
            } else {
                sendError('User not found', 404, res);
            }
        }
    })
});


var isUserCreated = function (token) {
    if (token in users) {
        return true;
    } else {
        return false;
    }
}

var isRoomCreated = function (token) {
    if (token in rooms) {
        return true;
    } else {
        return false;
    }
}

var isUserNameAvailable = function (name) {
    let available = true;
    console.log(users);
    for (token in users) {
        if (users[token].name === name) {
            available = false;
        }
    }
    return available;
}

var createNewRoom = function (data, client, successCb, errorCb) {

    var newroom = new Room(data.name, client, data.pw, ws, rooms);

    if (newroom) {
        console.log(newroom.getMetadata());
        ws.broadcastNewRoom(newroom.getMetadata())
        rooms[newroom.id] = newroom;
        successCb(newroom.getMetadata().id);
    }
    else {
        errorCb('Internal Error', {
            status: 500,
            data: [],
            message: 'Internal Error'
        });
    }
}

// verify Token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();

    } else {
        sendError('Access denied', 403, res);
    }
}

module.exports = () => {
    return [router, connectSocket];
}