// Cha-tty client
// Jesse Sibley

var net = require('net');
var charm = require('charm')();
var colors = require('colors');
var readline = require('readline');

// Greet Client
console.log("Welcome to Cha-TTY 0.1".underline.green);

// Setup readline
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask Client for Connection Details
var address, port, username;
rl.question("Desired Room Address: ", function(address){
  console.log("Pinging ".magenta + address.cyan);
  // PING server to make sure it exists
  console.log("-> Connection Successful!".green);
  rl.question("Desired Room Port (blank 7000): ", function(port){
    if (port == '' || port == ' '){
      port = 7000;
    } else {
      port = parseInt(port);
    }
    rl.question("Desired Room Username: ", function(username){
      connect(address, port, username);
      rl.close();
    });
  });
});

function connect(address, port, username) {
  var client = net.connect({port: port, host: address}, function(){
    // On First Connect, Client must send meta string
   console.log("Connected Successfully!");
  });

  client.on('data', function(data){

  });

  client.end('end', function(){
    console.log("Disconnected!");
  });
}

