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
        var code = Math.floor(Math.random() * 300)
        mongoose.model('User').findOne({
            socketId: socket.id
        }, function(err, user){
          if(user){
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
          }
        });
    });
    socket.on("submitcode", function(code){
        //Add the socket.uuid as the opponent in the match, and send a start message to both socket, and sockets[{{HOST UUID}}]
        mongoose.model('Match').find({
            code: code
        }, function(err, match){
            if (!match.partner){
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
    socket.on("submitacceleration",function(data) {
      mongoose.model('Match').findOne({
          _id: data.matchId
      }).populate("initiator.user").populate("partner.user").exec(function(err,match){
        if(match.initiator.user.socketId == socket.id){
          match.initiator.acceleration = data.acceleration;
        }
        else if (match.partner.user.socketId == socket.id){
          match.partner.acceleration = data.acceleration;
        }
        match.save(function(err, match){
          if(match.initiator.acceleration && match.partner.acceleration){
            if(match.initiator.acceleration > match.partner.acceleration){
              match.winner = match.initiator.user._id;
            }
            else{
              match.winner = match.partner.user._id;
            }
            match.save(function(err, match){
              match.populate("initiator.user").populate("partner.user").populate("winner", function(err, match){
                io.to(match.initiator.user.socketId).emit("done", match);
                io.to(match.partner.user.socketId).emit("done", match);
                getLeaderboard();
              });
            });
          }
        });
      });
    });
    socket.on("register", function(id){
      mongoose.model("User").findById(id, function(err, user){
        user.socketId = socket.id;
        user.save(function(){
          socket.emit("registered", user);
        });
      });
    });

    function getLeaderboard(){
      mongoose.model("User").find({}).lean().exec(function(err, users){
        mongoose.model("Match").find({}).populate("initiator.user").populate("partner.user").populate("winner").lean().exec(function(err, matches){
          matches = matches.filter((match)=>(match.partner)).filter((match)=>(match.winner));
          for(var user of users){
            user.games = 0
            user.wins  = 0
            for(var match of matches){
              if(match.initiator.user._id.toString()==user._id.toString()||match.partner.user._id.toString()==user._id.toString()){
                user.games += 1
              }
              if(match.winner._id.toString()==user._id.toString()){
                user.wins += 1;
              }
            }
          }
          users.sort((a, b)=>(b.wins - a.wins));
          io.emit("leaderboard",users);
        });
      });
    }

    socket.on("getLeaderboard", getLeaderboard);
});

app.get("/leaderboard",function(req,res){
  mongoose.model("User").find({}, function(err, users){
    mongoose.model("Match").find({}, function(err, matches){
      matches = matches.filter((match)=>(match.partner)).filter((match)=>(match.winner));
      //var arrUserData = {};
      for(var x in users){
        //arrUserData[]
        user.games = 0
        user.wins  = 0
        for(var y in matches){
          if(match.initiator.user._id==user._id||match.partner.user._id==user._id){
            user.games += 1
          }else{
            //No game particpation here.
          }
          if(match.winner._id==user._id){
            user.wins += 1;
          }
        }
      }
      console.log(users);
      res.send(JSON.stringify(users));
    });
  });
});

app.use("/", express.static("../frontend/build"))
