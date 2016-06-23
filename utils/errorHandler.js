var $ = require("gulp-load-plugins")();
module.exports = function(e) {
    var message = determineErrorMessage(e);
    $.notify().write(message);
    this.emit("end");
};


function determineErrorMessage(e) {
    switch(e.code) {
    case "EPERM":
        return new Error(`The destination file ${e.path} cannot be written to. Does the file need to be checked out from version control?`);
    }

    return e;
} 