const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Room = require('../game/room.js');

var rooms = [];
// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


router.post('/createRoom', (req, res) => {
    let createdRoom = createNewRoom(req);
    if (createdRoom) {
        response.data = createdRoom;
        res.json(response);
    } else {
        sendError('Can`t create new Room');
    }
})

router.get('/Rooms', (req, res) => {
    response.data = rooms;
    res.json(response);
})


var createNewRoom = function (client) {
    let room = new Room('Test', client)
    if(room){
        rooms.push(room)
        return room;
    }
    else{
        return null;
    }
}

module.exports = router;