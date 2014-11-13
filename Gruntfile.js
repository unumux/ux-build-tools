//Framework Version 2.0.0 for MVC applications
module.exports = function (grunt) {
<<<<<<< HEAD:Gruntfile.js

  grunt.initConfig({
    variables: grunt.file.readJSON('variables.json'),

    sass: {
      dev: {
        files: {
          '<%= variables.dev.css %>': '<%= variables.dev.scss %>' // Output : Input
        }
      },
      release: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '<%= variables.release.css %>': '<%= variables.dev.scss %>' // Output : Input
        }
      }
=======
  // save users grunt config so we can merge it in later
  var userConfig = grunt.config.get();

  var options = {
    config : {
        src: __dirname + "/config/*.json"
>>>>>>> develop:tasks/uiFramework.js
    },
    uiFramework: grunt.file.readJSON(__dirname + '/defaults.json')
  };

<<<<<<< HEAD:Gruntfile.js
    concat: {
      debug: {
        nonull: true,
        src: '<%= variables.debug.jsSource %>',
        dest: '<%= variables.dev.js %>'
      },
      dev: {
        nonull: true,
        src: '<%= variables.dev.jsSource %>',
        dest: '<%= variables.dev.js %>'
      }
    },

    uglify: {
      options: {
        report: 'gzip',
        mangle: false
      },
      release: {
        files: {
          '<%= variables.release.js %>' : '<%= concat.dev.dest %>'
        }
      }
    },

    copy: {
      bootstrap: {
        files: [
          {
            expand:true, flatten: true,
            src: '<%= variables.build.bowerBootstrap %>',
            dest: '<%= variables.build.bootstrapDest %>'
          }
        ]
      },
      mixins: {
        files: [
          {
            expand:true, flatten: true,
            src: '<%= variables.build.bowerMixins %>',
            dest: '<%= variables.build.mixinsDest %>'
          }
        ]
      },
      jquery: {
        files: [
          {
            expand:true, flatten:true,
            src: '<%= variables.build.bowerJquery %>',
            dest: '<%= variables.build.jqueryDest %>'
          }
        ]
      },
      branding: {
        files: [
          {
            expand:true, flatten:true,
            src: '<%= variables.build.brandingSrc %>',
            dest: '<%= variables.build.brandingDest %>'
          }
        ]
      },
      sourceSans: {
        files: [
          {
             expand:true, flatten:true,
             src: '<%= variables.build.sourceSansSrc %>',
             dest: '<%= variables.build.sourceSansDest %>'
          }
        ]
      },
      oswald: {
        files: [
          {
            expand:true, flatten:true,
            src: '<%= variables.build.oswaldSrc %>',
            dest: '<%= variables.build.oswaldDest %>'
          }
        ]      
      }
    },

    clean: [
      "<%= variables.build.cleanFolders %>"
    ],

    jshint: {
      files: {
        src: '<%= variables.debug.js %>'
      }
    },

    uncss: {
      dev: {
        options: {
          ignore: [
            /js.*/,
            /active.*/,
            /left.*/,
            /right.*/,
            /prev.*/,
            /next.*/,
            '.has-success',
            '.has-error'
          ]
        },
        files: {
          '<%= variables.dev.css %>': '<%= variables.dev.html %>'
        }
      },

      release: {
        options: {
          ignore: [
            /js.*/,
            /active.*/,
            /left.*/,
            /right.*/,
            /prev.*/,
            /next.*/,
            '.has-success',
            '.has-error'
          ],
          report: 'min'
        },
        files: {
          '<%= variables.release.css %>': '<%= variables.dev.html %>'
        }
      }
    },

    captain_hook: {
      debug: {
        jsFiles: '<%= variables.debug.jsPath %>',
        cssFiles: '<%= variables.debug.cssPath %>',
        targetHtml: '<%= variables.debug.masterLayout %>'
      },
      release: {
        jsFiles: '<%= variables.release.jsPath %>',
        cssFiles: '<%= variables.release.cssPath %>',
        targetHtml: '<%= variables.debug.masterLayout %>'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: '<%= variables.watch.scss %>',
        tasks: ['sass:dev']
      },
      js: {
        files: '<%= variables.watch.js %>',
        tasks: ['modernizr'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['<%= variables.watch.html %>'],
        options: {
          livereload: true
        }
      }
    },

    browserSync: {
      bsfiles: {
        src: '<%= variables.debug.cssPath %>'
      },
      options: {
        proxy: '<%= variables.debug.proxy %>',
        watchTask: true
      }
    },

    modernizr: {
      dist: {
        "devFile": '<%= variables.dev.modernizr %>',
        "outputFile": "<%= variables.release.modernizr %>",
        "parseFiles": true
      }
    }

  });

  grunt.registerTask('bower', function() {
    var exec = require('child_process').exec;
        var cb = this.async();
        exec('bower install', function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
  });

   grunt.registerTask('git', function() {
    var exec = require('child_process').exec;
        var cb = this.async();
        exec('git clone https://github.com/unumux/UI-Framework', function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
  });

=======
  var configs = require('load-grunt-configs')(grunt, options);
  grunt.initConfig(configs);

  // merge in user's grunt config
  grunt.config.merge(userConfig);

>>>>>>> develop:tasks/uiFramework.js
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

<<<<<<< HEAD:Gruntfile.js
  grunt.registerTask('build', ['bower', 'git', 'copy', 'clean', 'sass:dev', 'captain_hook:debug']);
  grunt.registerTask('debug', ['captain_hook:debug', 'browserSync', 'watch']);
  grunt.registerTask('dev', ['sass:dev', 'uncss:dev', 'captain_hook:dev']);
  grunt.registerTask('release', ['concat:dev', "uglify", 'sass:release', 'uncss:release', 'captain_hook:release']);
=======
  //grunt.registerTask('build', ['wiredep', 'sass_injection', 'sass:dev', 'captain_hook:debug']);
  grunt.registerTask('debug', ['wiredep', 'sass_injection', 'sass:dev', 'captain_hook:debug', 'browserSync', 'watch']);
  grunt.registerTask('dev', ['sass:dev', 'autoprefixer', 'uncss:dev']);
  grunt.registerTask('release', ['concat:release', 'uglify', 'sass:release', 'autoprefixer', 'uncss:release', 'captain_hook:release']);


>>>>>>> develop:tasks/uiFramework.js
};
