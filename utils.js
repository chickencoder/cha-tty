// just some useful utils
// written for cha-tty

var net = require('net');
var colors = require('colors');

// Exports
module.exports = {
  ping: ping,
  clear: clear,
  score: score,
}


function ping(address, port){
  if (net.connect({port: port, host: address})){
    return true;
  } else {
    return false;
  }
}

function clear(){
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
      console.log('\n'.bgBlack);
  }
}

function score() {
  var cols = process.stdout.getWindowSize()[0];
  for(var i = 0; i < cols; i++) {
    process.stdout.write("=");
  }
}
