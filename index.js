var gulp = require('gulp');
var requireDir = require('require-dir');

var tasks = requireDir('./tasks');

gulp.task('default', ['styles', 'js', 'watch']);
