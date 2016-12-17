var express = require("express")
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var config = require('./config/config.js')

server.listen(config.host);

mongoose.connect(config.dbURL);
require('./models');

io.on("connection", function (socket){
  socket.emit("message", "testing");
});

app.use("/", express.static("frontend"))
