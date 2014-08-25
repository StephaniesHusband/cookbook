module.exports = function(grunt) {

   // This module makes it possible to redirect (rewrite internally or redirect using HTTP 
   // codes) User to the specific URL based on RegExp Rules. The designated successor of
   // grunt-connect-rewrite.
	var rewriteModule = require('http-rewrite-middleware');
   var localhost = grunt.option("localhost") || "localhost";
	
	// Project configuration.
	grunt.initConfig({
      //------------------------------
      // Project configuration
      //------------------------------
      localhostPort: 9001,

      // -------------------------------------------------------------------
      // Get data from package.json and assign it to a pkg variable
      // -------------------------------------------------------------------
	   pkg: grunt.file.readJSON('package.json'),

      // -------------------------------------------------------------------
      // Task: concurrent
      // https://github.com/sindresorhus/grunt-concurrent
      // -------------------------------------------------------------------
      concurrent: {
         serve: {
            tasks: [ 'server', 'watch' ],
            options: {
               logConcurrentOutput: true
            }
         }
      },

	   connect: {
	    	server: {
				options: {
					port: '<%= localhostPort %>',
					keepalive: true,
					livereload: true,
					middleware: function (connect, options) {
                  // Setup the proxy
                  var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                  // RewriteRules support
                  middlewares.push(rewriteModule.getMiddleware([
                     //rewrite url for SSI includes on UI elements
                     //{from: '^index.html$', to: '/.tmp/index.html'},
                     {from: 'cookbook/(development|index).html', to: '.tmp/$1.html'}
                  ], { verbose: true }));

                  // make options.base an array if is not already.
                  if (!Array.isArray(options.base)) {
                     options.base = [options.base];
                  }

                  var directory = options.directory || options.base[options.base.length - 1];
                  options.base.forEach(function (base) {
                     // Serve static files.
                     middlewares.push(connect.static(base));
                  });

                  // Make directory browse-able.
                  middlewares.push(connect.directory(directory));

                  return middlewares;
               }
				},
				proxies: [
               {
                  context: ['/templates', '/css', '/images'],
                  host: 'wwwtest.fedex.com',
                  port: 80,
                  https: false,
                  changeOrigin: false
               },
               {
                  context: ['/userCal', '/commonDataCal'],
                  host: 'wwwtest.fedex.com',
                  port: 443,
                  https: true,
                  changeOrigin: false
               }
            ]
	    	}
      },
      // grunt-ssi: Compiles HTML with SSI into static HTML pages
      ssi: {
         options: {
		      cache: 'all',
		      baseDir: '.'
         },
         ui: {
            files: [{
			    	expand: true,
			    	cwd: '.tmp',
					src: ['index.html', 'development.html'],
					dest: '.tmp/',
               ext: '.html'
            }]
         }
		},

      // ------------------------------------------------
      // Task: find and replace things in the project.
      // https://github.com/yoniholmes/grunt-text-replace
      // ------------------------------------------------
      replace: {
         // Replace all occurrences of Akamai server (images.fedex.com) with localhost:9001 for local testing.
			CDN: {
				src: ['cookbook/index.html','cookbook/development.html', 'cookbook/**/test.html'],
				dest: '.tmp/',
				replacements: [{
               from: 'images.fedex.com',
               to: 'localhost:<%= localhostPort %>'
				}]
			}
		},
      watch: {
         gruntfile: {
            files: '<%= jshint.gruntfile.src %>',
            tasks: ['jshint:gruntfile']
         },
         cookbookJs: {
            files: '<%= jshint.cookbookJs.src %>',
            tasks: ['jshint:cookbookJs'],
            options: {
               livereload: true
            }
         },
         html: {
            files: '<%= jshint.html.src %>',
            tasks: ['replace:CDN'],
            options: {
               livereload: true
            }
         }
      },
      jshint: {
         options: {
            curly: true,
            eqeqeq: true, 
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            unused: false,
            boss: true,
            eqnull: true,
            browser: true,
            globals: {
               '$': false,
               jQuery: false,
               google: false,
               steal: false,
               module: false,
               require: false,
               Modernizr: false,
               confirm: false
            }
         },
         gruntfile: {
            src: 'Gruntfile.js'
         },
         cookbookJs: {
            src: [
               'cookbook/**/**/*.js',
               '!**/properties.js',
               '!**/*_test.js'
            ]
         },
         html: {
            src: ['cookbook/*.html']
         }
      },
    });

	// Load the plugin that provides the above task.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-connect-proxy');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-ssi');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-concurrent');
	
	// Default task(s).
	grunt.registerTask('server', ['replace:CDN', 'ssi', 'configureProxies:server', 'connect:server']);
	grunt.registerTask('default', ['concurrent:serve']);
};
