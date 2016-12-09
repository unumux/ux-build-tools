var browserSync = require("browser-sync").create();
var config = require("./config.js")();
var headerMiddleware = require("./header-middleware.js");
var loginMiddleware = require("./login-middleware.js");

var browserSyncConfig = {
    open: config.open === false ? false : true
};

browserSyncConfig.middleware = [headerMiddleware];

if (config.local.server) {
    browserSyncConfig.server = "./";
} else if (config.local.proxy) {

    browserSyncConfig.proxy = {
        target: config.local.proxy
    };

    if (config.global && config.global.login && (config.global.login.username || config.global.login.password)) {
        browserSyncConfig.proxy.middleware = loginMiddleware(config.global.login.username, config.global.login.password);
    }

}

var inited = false;

module.exports = function() {
    if (config.tasks.length === 0 && !inited && browserSyncConfig) {
        browserSync.init(browserSyncConfig);
        inited = true;
    }

    return browserSync.reload;
};
