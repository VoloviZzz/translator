var express                    = require('express');
var session                    = require('express-session');
var SessionStore               = require('express-mysql-session');
var http                       = require('http');
var connect                    = require('connect');
var path                       = require('path');
var app                        = express();
var fs                         = require("fs");
// var gm                         = require('gm').subClass({imageMagick: true});
multiparty                     = require('multiparty');
var bodyParser                 = require("body-parser");
var jsonParser                 = bodyParser.json();



app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var api                        = require('./api');
const mysql                    = require("mysql");
const dbSettings               = require("./db_settings.js");
const config                   = require("./config.js");
const connection               = mysql.createConnection(dbSettings);
var io												 = require('socket.io').listen(3007);

connection.connect();

app.use(express.static(__dirname + '/client'));
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new SessionStore(dbSettings)
}));





io.sockets.on('connection', function (client) {
    client.on('message', function (message) {
        try {
            client.emit('message', message);
            client.broadcast.emit('message', message);
        } catch (e) {
            console.log(e);
            client.disconnect();
        }
    });
		client.on('disconnect', function() {
				var time = (new Date).toLocaleTimeString();
				io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
			});

});



app.get('/', function (req, res, next) {

    res.render('index');

});


app.listen(config.port, (err) => {
		if (err) return console.log("Ошибка запуска сервера:" + err.message);
		console.log('Проект запущен на '+config.port+' порт');
});
