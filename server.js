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

// Just something useful for later on
String.prototype.contains = function(it) { 
  return this.indexOf(it) != -1; 
};

console.log("[cha-TTY] Running server on port 7000...")
console.log("[cha-TTY] Ctrl-C to stop!")

net.createServer(function(stream){
  c = new Client(stream, stream.remoteAddress);
  console.log("[cha-TTY] New Client has joined " + stream.remoteAddress);

  c.stream.on('data', function(data){
    data = data.toString().trim();
    if (data.contains('usr')) {
      var i = data.split('::');
      username = i[1];
      c.uname = username;
      console.log("[cha-TTY] " + stream.remoteAddress + " identified as: " + username);
    }

  });

}).listen(port, host);
