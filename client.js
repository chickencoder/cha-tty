// Cha-tty client
// Jesse Sibley

var net = require('net');
var charm = require('charm')();
var colors = require('colors');
var readline = require('readline');

var utils = require('./utils');

// Just something useful for later on
String.prototype.contains = function(it) {
  return this.indexOf(it) != -1;
};

utils.clear();
console.log("Welcome to Cha-TTY".blue +  " 0.1".red);
getDetails();

// Ask Client for Connection Details
function getDetails() {
  // Setup readline
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var address, port, username;
  rl.question("Desired Room Address: ", function(address){
    rl.question("Desired Room Port (blank 7000): ", function(port){
      if (port == '' || port == ' '){
        port = 7000;
      } else {
        port = parseInt(port);
      }
      console.log(port);
      console.log("Pinging '".magenta + address.cyan + "' on port ".magenta + port.toString().cyan);
      var ping = utils.ping(address, port);
      if (ping) {
        console.log("-> Connection Successful!".green);
      } else {
        console.log("-> Connection Unsuccesful!".red);
        rl.question("Try Again? (y/n): ", function(ans){
          if (ans == 'y' || ans == 'Y') {
            getDetails();
          } else {
            process.exit();
          }
        });

      }
      rl.question("Desired Room Username: ", function(username){
        connect(address, port, username);
        rl.close();
      });
    });
  });
}

function connect(address, port, username) {
  // Before we connect, setup terminal
  // so to respond and interact with
  // charm. Then clear the screen.

  // Get width & height


  var client = net.connect({port: port, host: address}, function(){
    // On First Connect, Client must send meta string
   console.log("Connected to Server".green);

   // Send server username
   client.write('UNAME:' + username);

   // Draw Interface
   draw();
   process.stdout.on('resize', function() {
     utils.clear();
     draw();
   });

  });

  client.on('data', function(data){
    data = data.toString().trim();

  });

  client.on('end', function(){
    console.log("Disconnected!");
  });
}

function draw() {
  charm.pipe(process.stdout);
  charm.reset();
  charm.position(0, 0);

  var width  = process.stdout.getWindowSize()[0];
  var height = process.stdout.getWindowSize()[1];

  // Load interface
  var one_qua = parseInt(width / 4);
  var one_half  = parseInt(width / 2);
  var two_third = parseInt(width / 3 * 2);

  charm.position(one_qua, 1);
  for (var i = 0; i < height; i++) {
    charm.write('||');
    charm.position(one_qua, i);
  }
}
