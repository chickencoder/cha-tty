// CHA-TTY
// Terminal Chatroom
// Self-hosted & open
// Jesse Sibley (2015)

var net = require("net");

var config = require("./preferences.json");
var port = 7000;
var host = 'localhost';

function Client(stream, address) {
  this.stream  = stream;
  this.address = address;
  this.uname   = "";
}

net.createServer(function(stream){
  c = new Client(stream, stream.remoteAddress);
  console.log("New Client! " + stream.remoteAddress);
  
  c.stream.on('data', function(data){
    data = data.toString().trim();
    c.stream.write(data);
  });

}).listen(port, host);
