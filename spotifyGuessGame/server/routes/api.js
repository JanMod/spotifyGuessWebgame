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
    console.log(req.body);
    createNewRoom(req.body, req, result => {
        response.data = result;
        res.json(response);
    }, err => {
        sendError(err, res);
    });
})

router.get('/Rooms', (req, res) => {
    response.data = rooms;
    res.json(response);
})



var createNewRoom = function (data, client, successCb, errorCb) {
    if (data.name === "" | data.name === null | data.name === undefined) {
        errorCb('name is invalid');
    }

    let newroom = new Room(data.name, client)
    if (newroom) {
        rooms.push(newroom)
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

module.exports = router;