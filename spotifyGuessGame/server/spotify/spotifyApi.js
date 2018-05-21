//https://accounts.spotify.com/authorize
class spotifyApi {
    constructor(router, users) {
        this.router = router;
        this.users = users;
        this.request = require('request');
        var SpotifyWebApi = require('spotify-web-api-node');

        // credentials are optional




        this.router.get('/spotify/auth/:id', function (req, res) {
            console.log('spotifyApi');
            let spotifyApi = new SpotifyWebApi({
                clientId: 'b0d351dcda7f41dda0ee97dc433f23c6',
                clientSecret: 'd992e2c658cb46b4b0bca9451437bf32',
                redirectUri: 'http://localhost:8000/api/spotify/callback'
            });
            var state = req.params.id;
            let user = users[req.params.id];
            user.spotify = spotifyApi;
            let scopes = ['user-modify-playback-state']
            var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
            res.redirect(authorizeURL);
        });

        this.router.get('/spotify/callback', (req, res) => {

            // your application requests refresh and access tokens
            // after checking the state parameter

            var code = req.query.code || null;
            var state = req.query.state || null;

            let user = this.users[state];

            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: 'http://localhost:8000/api/spotify/callback',
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(user.spotify._credentials.clientId + ':' + user.spotify._credentials.clientSecret).toString('base64'))
                },
                json: true
            };
            let self = this;
            this.request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    var access_token = body.access_token,
                        refresh_token = body.refresh_token;


                    user.spotify.setAccessToken(access_token);
                    // use the access token to access the Spotify Web API

                    // we can also pass the token to the browser to make requests from there
                    res.redirect('http://localhost:4200/room/' + user.room.id);
                } else {
                    res.redirect('/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                }
            });

        })

        this.router.get('/spotify/callback', (req, res) => {

        })

    }
}


module.exports = (router, users) => new spotifyApi(router, users);