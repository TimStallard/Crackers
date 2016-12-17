var express = require("express")
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(5050);

io.on("connection", function (socket){
  socket.emit("message", "testing");
});

app.use("/", express.static("frontend"))
