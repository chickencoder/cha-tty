// CHA-TTY
// Terminal Chatroom
// Self-hosted & open
// Jesse Sibley (2015)

var net = require("net");

var port = 7000;
var host = 'localhost';

var prefs;
try {
  prefs = require("./pref.json");
} catch (err) {
  console.log("[cha-TTY] ERR: PREF.JSON NOT FOUND!");
  console.log("[ FORCED EXIT ]");
  process.exit();
}

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

    if (data.contains('UNAME')){
      var uname = data.split(':')[1];
      c.uname = uname;
    }
  });
}).listen(port, host);
