module.exports = function(grunt) {

	var rewriteModule = require('http-rewrite-middleware');
	
	// Project configuration.
	grunt.initConfig({
	   pkg: grunt.file.readJSON('package.json'),

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
					port: 9001,
					keepalive: true,
					livereload: true,
					middleware: function (connect, options) {
	                    // Setup the proxy
	                    var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];
	
	                    // RewriteRules support
	                    middlewares.push(rewriteModule.getMiddleware([
	                      	//rewrite url for SSI includes on UI elements
	                      	//{from: '^index.html$', to: '/.tmp/index.html'},
	                      	{from: '^/cookbook/(.*).html$', to: '/.tmp/$1.html'}
	                    ]));
	
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
	    replace: {
			CDN: {
				src: ['cookbook/index.html','cookbook/development.html'],
				dest: '.tmp/',
				replacements: [{
	               from: 'images.fedex.com',
	               to: 'localhost:9001'
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
