var _ = require('lodash');

module.exports = function (grunt) {
  // save users grunt config so we can merge it in later
  var userConfig = grunt.config.get();

  var options = {
    config : {
        src: __dirname + "/config/*.json"
    },
    uiFramework: grunt.file.readJSON(__dirname + '/defaults.json')
  };

  var configs = require('load-grunt-configs')(grunt, options);
  grunt.initConfig(configs);

  // merge in user's grunt config
  grunt.config.merge(userConfig);

  // Pull in the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-captain-hook');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass-injection');
  grunt.loadNpmTasks('grunt-autoprefixer');


  grunt.registerTask("default", function () {
    require('./modules/help.js')(grunt)
  });

  //grunt.registerTask('build', ['wiredep', 'sass_injection', 'sass:dev', 'captain_hook:debug']);
  grunt.registerTask('debug', ['wiredep', 'sass_injection', 'sass:dev', 'autoprefixer', 'captain_hook:debug', 'browserSync', 'watch']);
  grunt.registerTask('dev', ['sass:dev', 'autoprefixer', 'uncss:dev']);
  grunt.registerTask('release', ['concat:release', 'uglify', 'sass:release', 'autoprefixer', 'uncss:release', 'captain_hook:release']);


};
