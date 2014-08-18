steal.config({
	map: {
		"*": {
			"can": "/templates/components/libraries/1.2/can/1.1.6/can",
			"jquerypp": "/templates/components/libraries/1.2/jquerypp/1.0.1/jquerypp",
			"funcunit": "/templates/components/libraries/1.2/funcunit/3.2.3/funcunit",
			"jquery/jquery.js": "/templates/components/libraries/1.2/can/1.1.6/can/lib/jquery.1.9.1.js",
			"cookbook": "/cookbook"
		}
	},
	shim : {
		jquery: {
			exports: "jQuery"
		},
		"/templates/components/libraries/1.2/dateinput/1.3.0/jquery.dateinput.js" :{
			deps: ["jquery/jquery.js"]
		}
	},
	ext: {
		js: "js",
		css: "css",
		mustache: "can/view/mustache"
	}
});
