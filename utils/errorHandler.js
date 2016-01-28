var $ = require("gulp-load-plugins")();

module.exports = function(e) {
    $.notify().write(e);
    this.emit("end");
};
