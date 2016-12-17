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
    socket.on("signup", function(data){
        var User = mongoose.model("User");
        var newUser = User({
            name: data.name,
            socketId: socket.id
        });

        newUser.save(function(err, user){
            socket.emit("id", user._id);
        });
    });
    socket.on("getcode", function(){
        //START MATCH WITH THIS CODE, adding the socket.uuid as host
        var code = Math.floor(Math.random() * 300)
        mongoose.model('User').findOne({
            socketId: socket.id
        }, function(err, user){
            var Match = mongoose.model("Match");
            var newMatch = Match({
                initiator: user._id,
                code: code
            });
            newMatch.save(function(err, match){
                match.populate("initiator", function(err, match){
                    socket.emit("code", code);
                });
            });
        });
    });
    socket.on("submitcode", function(code){
        //Add the socket.uuid as the opponent in the match, and send a start message to both socket, and sockets[{{HOST UUID}}]
        mongoose.model('Match').find({
            partner: socket.id
        }, function(err, match1){
            if (!(match1 == null)) {
                mongoose.model('User').findOne({
                    socketId: socket.id
                }, function(err, user){
                    mongoose.model('Match').findOneAndUpdate({"code": code}, {"partner": user._id}).populate("initiator","partner").exec(function(err, match){
                        socket.emit("start", match);
                    });
                });
            } else {
                socket.emit("error", "There is already a second person in this cracker match!");
            }
        })
    });
});

app.use("/", express.static("../frontend/build"))
