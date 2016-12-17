var express = require("express")
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var config = require('./config/config.js');
var mongoose = require('mongoose');
var UUID = require('uuid-js');

server.listen(config.listen.port, config.listen.hostname);

mongoose.connect(config.dbURL);
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
                "initiator.user": user._id,
                code: code
            });
            newMatch.save(function(err, match){
                match.populate("initiator.user", function(err, match){
                    socket.emit("code", code);
                });
            });
        });
    });
    socket.on("submitcode", function(code){
        //Add the socket.uuid as the opponent in the match, and send a start message to both socket, and sockets[{{HOST UUID}}]
        mongoose.model('Match').find({
            code: code
        }, function(err, match1){
            if (!match1.partner){
                mongoose.model('User').findOne({
                    socketId: socket.id
                }, function(err, user){
                    mongoose.model('Match').findOne({"code": code}, function(err, match){
                      match.partner.user = user._id;
                      match.save(function(err, match){
                        match.populate("partner.user").populate("initiator.user", function(err, match){
                          socket.emit("start", match);
                          io.to(match.initiator.user.socketId).emit("start", match);
                        });
                      });
                    });
                });
            } else {
                socket.emit("error", "There is already a second person in this cracker match!");
            }
        })
    });
    socket.on("motionComplete",function(data) {
      mongoose.model('Match').find({
          code: data.matchId
      }, function(err,match1) {
        if(match1.initator.user.socketId==socket.id){
          //
          match1.initator.user.score = data.score;
          match1.save(function(err, match2){
            if(err) console.log(err);
            if(match2.initator.user.score&&match2.partner.user.score){
              socket.emit("start", match);
              io.to(match.partner.user.socketId).emit("done", match2);
            }
          });
        }else if (match1.partner.user.socketId==data.userId) {
          //
          match1.partner.user.score = data.score;
          match1.save(function(err, match2){
            if(err) console.log(err);
            if(match2.initator.user.score&&match2.partner.user.score){
              socket.emit("start", match);
              io.to(match.initator.user.socketId).emit("done", match2);
            }
          });
        }else{
          //This person shouldnt even be here
        }
      //  if initiator.user.socketId == socketId then populate initiator score otherwise populate partner score
      //  then if both complete decide winner
      }
    });
});

app.use("/", express.static("../frontend/build"))
