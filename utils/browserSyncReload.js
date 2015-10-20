console.log('create');
var browserSync = require('browser-sync').create();
var config = require('./config.js')();
var loginMiddleware = require('./login-middleware.js');

var browserSyncConfig = {}
if(config.local.server) {
    browserSyncConfig.server = "./";
} else if(config.local.proxy) {
    if(!config.global || !config.global.login || !config.global.login.username || !config.global.login.password) {
        console.log('You must setup your memberservices credentials. Please run ux --login (this needs to only be done once)');
        process.exit(1);
    }
    browserSyncConfig.proxy = {
        target: config.local.proxy,
        middleware: loginMiddleware(config.global.login.username, config.global.login.password)
    }
}


if(browserSyncConfig) {
    browserSync.init(browserSyncConfig);
}


module.exports = function() {
  console.log('reload');
  return browserSync.reload;
}
