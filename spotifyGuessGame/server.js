const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
var socket = require('socket.io');
var apiArray = require('./server/routes/api')();
const api = apiArray[0];
const apiSocket = apiArray[1];
const cors = require('cors')

app.use(cors());

/*
app.use(function (req, res, next) {

    console.log('test');
    var allowedOrigins = ['http://localhost:4200', 'http://localhost:8000', 'https://accounts.spotify.com/authorize/', '/api/spotifyAuth'];
    var origin = req.headers.origin;
    console.log(origin);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');



    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});*/

// Parsers

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});



//Set Port
const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

//api.connectWs(server);
apiSocket(socket(server));

