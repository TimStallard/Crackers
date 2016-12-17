var express = require("express")
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var config = require('./config/config.js');
var mongoose = require('mongoose');
var auth = require('./auth.js');
var UUID = require('uuid-js');

server.listen(config.listen.port, config.listen.hostname);

mongoose.connect("mongodb://terminalvelocity:superdupersecretpassword@ds047666.mlab.com:47666/hth-crackers");
require('./models');
var sockets = {};

io.on("connection", function (socket){
    socket.uuid = UUID.create();
    socket.on("signup", function(data){
        var User = mongoose.model("User");
        var newUser = User({
            name: data.name,
            UUID: socket.uuid
        });

        newUser.save(function(err, user2){
            socket.emit("id", socket.uuid);
        });
    });
    socket.on("getcode", function(){
        //START MATCH WITH THIS CODE, adding the socket.uuid as host
        socket.emit("code", Math.floor(Math.random() * 300));
    });
    socket.on("submitcode", function(){
        //Add the socket.uuid as the opponent in the match, and send a start message to both socket, and sockets[{{HOST UUID}}]
        socket.emit("start");
    });
});

app.use("/", express.static("../frontend"))
