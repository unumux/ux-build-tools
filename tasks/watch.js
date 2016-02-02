var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var config = require("../utils/config.js")();

var reload = require("../utils/browserSyncReload.js")();

gulp.task("watch", function() {
    if (config.local.scss) {
        gulp.watch(config.local.scss.src, ["styles"]);
    }

    if (config.local.js.legacy && config.local.js.legacy.concat) {
        var watcher = gulp.watch([config.local.js.src, "!**/site.min.js"], ["js"]);

        watcher.on("change", function(event) {
            if (event.type === "deleted") {
                delete $.cached.caches["scripts"][event.path];
                $.remember.forget("scripts", event.path);
            }
        });
    }

    if (config.local.watch) {
        gulp.watch(config.local.watch, reload);
    }
});
