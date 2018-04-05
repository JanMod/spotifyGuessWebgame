const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Room = require('../game/room.js');
const User = require('../game/user.js');


//store rooms and users in array dictionary
var rooms = [];
var users = [];

var ws= {};

var connectSocket = function (_socket) {
    ws.socket = _socket;
    ws.socket.sockets.on('connection', socket => {
        console.log(socket.id);
        socket.join('newRoom');
        socket.on('setUserWs', (data, cb) => {
            if(isUserCreated(data.id)){
                users[data.id].setSocket(socket);
                cb(true);
            }else{
                cb(false);
            }
        })
    })

    ws.broadcastNewRoom =  function (room) {
        ws.socket.sockets.to('newRoom').emit('newRoom', room);
    }

}


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.post('/createUser', (req, res) => {
    let name = req.body.name;
    if (!name) {
        sendError('No username found', res);
        return;
    }
    if (isUserNameAvailable(req.body.name)) {
        console.log(req.body);
        let user = new User(req.body.name);
        users[user.id] = user;
        res.json(user);
    } else {
        sendError('Username is already taken', res);
    }

});

router.post('/createRoom', (req, res) => {
    createNewRoom(req.body, req, result => {
        response.data = result;
        res.json(response);
    }, err => {
        sendError(err, res);
    });
});

router.get('/Rooms', (req, res) => {
    response.data = rooms;
    res.json(response);
});

router.post('/joinRoom', (req, res) => {
    let user = users[req.body.user.id];

    if (user) {
        let room = rooms[req.body.id];
        if (room) {
            room.join(user);
            res.json(req.body);
        } else {
            sendError('Room not found', res);
        }
    } else {
        sendError('User not found', res);
    }
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

    var newroom = new Room(data.name, client, data.pw, ws.broadcastNewRoom);

    if (newroom) {
        console.log(newroom.getMetadata());
        ws.broadcastNewRoom(newroom.getMetadata())
        rooms[newroom.id] = newroom;
        successCb(newroom);
    }
    else {
        errorCb('Internal Error', {
            status: 500,
            data: [],
            message: 'Internal Error'
        });
    }
}

module.exports = () => {
    return [router, connectSocket];
}