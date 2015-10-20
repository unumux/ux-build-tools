var bower = require('bower');
var path = require('path');
var fs = require('fs');

var config = {};

module.exports = function() {
  if(config && config.local) {
    return config;
  }
  console.log('FIRST')

  config.bowerPackageFolder = bower.config.directory;

  config.local = require(path.join(process.cwd(), 'ux.json'));

  var home = getUserHome();
  var globalConfigPath = path.join(home, '.ux-global.json');

  if(fs.existsSync(globalConfigPath)) {
    config.global = require(globalConfigPath);
  }

  return config;
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
