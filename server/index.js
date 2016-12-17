var express = require("express")
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var config = require('./config/config.js');
var mongoose = require('mongoose');

server.listen(config.listen.port, config.listen.hostname);

mongoose.connect(config.dbURL);
require('./models');

io.on("connection", function (socket){
  socket.emit("message", "testing");
});

app.use("/", express.static("../frontend/build"))
