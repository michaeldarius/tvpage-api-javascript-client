/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: 
      '',
      //'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      //'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      //'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      //' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


    // Task configuration.
    clean: {
    	player: ["player/dist/"],
			www: ["www/dist/"],
			loader: ["loader/dist/"]
		},

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      player: {
        src: [ "player/dist/debug/require.js", "player/dist/debug/templates.js" ],
        dest: 'player/dist/debug/require.js',
        separator: ";"
      },
			www: {
				src: [ "www/dist/debug/require.js"],
				dest: 'www/dist/debug/require.js',
				separator: ";"
			},
			loader: {
				src: [ "loader/dist/debug/tvp.js", "loader/dist/debug/templates.js" ],
				dest: 'loader/dist/debug/tvp.js',
				separator: ";"
			}
    },

    handlebars: {
      all: {
        files: {
          "www/dist/templates/templates.js": [ "www/app/templates/**/*.html" ]
        },
        options: {
          processName: function(filePath) {
            // remove the www.. 
           return filePath.replace(/^www\//i, ""); 
          },
          wrapped: true,
          amd: true
        }
      }
    },

    less: {
      'player-definitions': {
        files: [{
          expand: true,        // Enable dynamic expansion.
          cwd: 'player/app/definitions/css',  // Src matches are relative to this path.
          src: ['*-main.less'],     // Actual pattern(s) to match.
          dest: 'player/app/definitions/css',  // Destination path prefix.
          ext: '.css'         // Dest filepaths will have this extension.
        }]
      },
      'player-skins': {
        files: [{
          expand: true,        // Enable dynamic expansion.
          cwd: 'player/assets/css',  // Src matches are relative to this path.
          src: ['skin-*.less'],     // Actual pattern(s) to match.
          dest: 'player/assets/css',  // Destination path prefix.
          ext: '.css'         // Dest filepaths will have this extension.
        }]
      },
      www: {
        options: {
          paths: ["www/assets/css/less"]
        },
        files: {
          "www/assets/css/core.css": "www/assets/css/less/styles.less",
          "www/assets/css/core-responsive.css": "www/assets/css/less/responsive.less"
        }
      }
    },

    cssmin: {
      www: {
        files: {
          "www/dist/release/index.css": ["www/assets/css/index.css"],
					"www/dist/release/core.css": ["www/assets/css/core.css"],
					"www/dist/release/core-responsive.css": ["www/assets/css/core-responsive.css"],
					"www/dist/release/website.css": ["www/assets/css/website.css"],
					"www/dist/release/application.css": ["www/assets/css/application.css"],
					"www/dist/release/plugins.css": ["www/assets/css/plugins.css"],
          "www/dist/debug/index.css": ["www/assets/css/index.css"],
					"www/dist/debug/core.css": ["www/assets/css/core.css"],
					"www/dist/debug/core-responsive.css": ["www/assets/css/core-responsive.css"],
					"www/dist/debug/website.css": ["www/assets/css/website.css"],
					"www/dist/debug/application.css": ["www/assets/css/application.css"],
					"www/dist/debug/plugins.css": ["www/assets/css/plugins.css"]
        }
      },
      player: {
        files: {
          "player/dist/release/index.css": ["player/assets/css/index.css"],
          "player/dist/debug/index.css": ["player/assets/css/index.css"]
        }
      }
    },

    requirejs: {
      www: {
        options: {
          baseUrl: "./www/app/",
          mainConfigFile: "www/app/config.js",
          out: "www/dist/debug/require.js",
          name: "config",
          wrap: true,
          optimize: "none",
          paths: {
            requireLib: '../assets/js/libs/require'
          },
          include: ["requireLib","main"],
          namespace: "tvpapp"
        }
      },
			player: {
				options: {
					baseUrl: "./player/app",
					mainConfigFile: "player/app/config.js",
					out: "player/dist/debug/require.js",
					name: "config",
					wrap: true,
					optimize: "none",
					paths: {
						requireLib: '../assets/js/libs/require'
					},
					include: ["requireLib","main"]/*,
					namespace: "tvpplayer"*/
				}
			},
			loader: {
				options: {
					baseUrl: "./loader/app",
					mainConfigFile: "loader/app/config.js",
					out: "loader/dist/debug/tvp.js",
					name: "config",
					wrap: true,
					optimize: "none",
					paths: {
						requireLib: 'require'
					},
					include: ["requireLib","main"],
					namespace: "tvploader"
				}
			}
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        //report: 'gzip',
        compress: true
      },
      www: {
        src: 'www/dist/debug/require.js',
        dest: 'www/dist/release/require.js'
      },
			player: {
				src: 'player/dist/debug/require.js',
				dest: 'player/dist/release/require.js'
			},
			loader: {
				src: 'loader/dist/debug/tvp.js',
				dest: 'loader/dist/release/tvp.js'
			}
    },
    /*jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },*/
    watch: {
      gruntfile: {
        files: ["app/**/*.js", "index.html"],
        tasks: ['debug']
      },
      www: {
        files: ["www/app/templates/**/*.html"],
        tasks: 'handlebars'
      },
      javascript: {
        files: ["app/**/*.js", "tests/specs/**/*Spec.js"],
        tasks: "jasmine"
      },
      //less: {
      //  files: ["player/assets/css/**/*.less", "player/app/definitions/css/**/*.less"],
      //  tasks: ["less:player", "less:skins"]
      //},
      'less-www': {
        files: ["www/assets/css/less/**/*.less"],
        tasks: ["less:www"]
      },
      'less-player': {
        files: ["player/app/definitions/css/**/*.less", "player/assets/css/**/*.less"],
        tasks: ["less:player-definitions", "less:player-skins"]
      },
      'less-player-definitions': {
        files: ["player/app/definitions/css/**/*.less"],
        tasks: ["less:player-definitions"]
      },
      'less-player-skins': {
        files: ["player/assets/css/**/*.less"],
        tasks: ["less:player-skins"]
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          baseUrl: "./"
        }
      },
      loader: {
        port: 8000,
        base: './loader/'
      },
      www: {
        port: 8001,
        base: './www/'
      },
      player: {
        port: 8002,
        base: './player/'
      }
    },
    jasmine: {
      loader: {
        src: 'app/**/*.js',
        options: {
          //keepRunner: true,
          specs: 'loader/tests/specs/*Spec.js',
          helpers: 'tests/specs/*Helper.js',
          host: 'http://127.0.0.1:8000/',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'loader/app/config.js',
            requireConfig: {
              baseUrl: "./loader/app/"
            }
          }
        }
      },
      www: {
        src: 'app/**/*.js',
        options: {
          //keepRunner: true,
          specs: 'www/tests/specs/**/*.js',
          helpers: 'www/tests/specs/*Helper.js',
          host: 'http://127.0.0.1:8000/',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'www/app/config.js',
            requireConfig: {
              baseUrl: "./www/app/"
            }
          }
        }
      },
      player: {
        src: 'app/**/*.js',
        options: {
          debug: true,
          //keepRunner: true,
          specs: [
            'player/tests/specs/components/**/*.js',
            'player/tests/specs/utils/**/*.js',
          ],
          helpers: 'player/tests/specs/*Helper.js',
          host: 'http://127.0.0.1:8000/',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'player/app/config.js',
            requireConfig: {
              baseUrl: "./player/app/"
            }
          }
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // TVP Tasks
  grunt.registerTask('debug:www', [ 'clean:www', 'handlebars', 'requirejs:www', 'concat:www']);
	grunt.registerTask('debug:player', [ 'clean:player', /*'handlebars',*/ 'requirejs:player', 'concat:player']);
	grunt.registerTask('debug:loader', [ 'clean:loader', /*'handlebars',*/ 'requirejs:loader', 'concat:loader']);

  grunt.registerTask('release:www', [ 'debug:www', 'uglify:www', 'cssmin' ]);
	grunt.registerTask('release:player', [ 'debug:player', 'uglify:player', 'cssmin' ]);
	grunt.registerTask('release:loader', [ 'debug:loader', 'uglify:loader' ]);

  grunt.registerTask('test:www', ['connect:www', 'jasmine:www']);
  grunt.registerTask('test:player', ['connect:player', 'jasmine:player']);
  grunt.registerTask('test:loader', ['connect:loader', 'jasmine:loader']);

  //TODO: LESS CSS compilation
  //grunt.registerTask('less', ['less:player', 'watch']);
};
