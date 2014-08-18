steal('can', 
	  'jquerypp/dom/cookie', 
	  function(can){
	

/**
 * @constructor Properties
 * @parent common
 * 
 * Display's properties for COOK app
 */
return can.Construct.extend(/* @static */{
	//static values
	locale: null,
	country: null,
	language: null,
	testData: null,
	realData: null,
	appProperties: null,
	
	init: function() {

		this.locale = this.getLocale();
		this.country = this.getCountry(this.locale);
		this.language = this.getLanguage(this.locale);
		this.loadCOOKProperties();
		this.testData = (this.queryUrlParam("testData")) ? this.queryUrlParam("testData").split(",") : [];
		this.realData = (this.queryUrlParam("realData")) ? this.queryUrlParam("realData").split(",") : [];
	},
	
	/**
	 * Function to get the locale
	 */
	getLocale : function() {
		var configuredLocale = "en_US";
		if (window.fdx_locale) {
			configuredLocale = window.fdx_locale;
		} else {
			var fdxLocaleCookie = $.cookie('fdx_locale');
			if (fdxLocaleCookie) {
				configuredLocale = fdxLocaleCookie;
			}
		}
		return configuredLocale;
	},
	
	changeLocale: function(locale) {
		var country = null;
		if (locale.length == 2) {
			country = this.getCountry(locale);
			this.locale = locale + "_" + (country?country.toUpperCase():"US");
		} else if(locale.split("_").length > 1) {
				var localeArray = locale.split("_");
				this.locale = localeArray[0] + "_" + localeArray[1].toUpperCase();
		} else {			
			this.locale = locale;
		}
		this.country = country || this.getCountry(locale);
		this.language = this.getLanguage(locale);
	},
	
	COOKPropertyPath : location.protocol + "//" + location.host + "/cookbook/properties/COOKProperties.json",
	
	queryUrlParam : function(name, fallback) {
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec(location.href);
		return (results == null) ? (fallback || "") : results[1];
	},
	
	loadCOOKProperties: function() {
		var that = this;
		//Set cache as false as we need WFRAPropertyPath.json to change the configuration
		//dynamically through Team Site.
		$.ajaxSetup( { "async": false, "cache":false } );
		
		$.getJSON(this.COOKPropertyPath)
			.done(function(propertiesJSON) {
				that.appProperties = propertiesJSON;
			}).fail(function(jqXHR,status,error) {
				steal.dev.warn("failed to load properties file:"+this.COOKPropertyPath+" bec:"+status+" :"+error);
			});
		
		//restore async and cache
		$.ajaxSetup( { "async": true, "cache":true } );
	},
	
	getCountry: function(locale) {
		var localelen = locale.length;
		var country = (localelen > 2) ? locale.substring(localelen-2, localelen).toLowerCase() : locale.toLowerCase();
		steal.dev.log("locale: "+locale+" getCountry: "+country);
		return country;
	},
	
	getLanguage:function(locale){		
		var localelen = locale.length;
		var language = (localelen > 2) ? locale.substring(0, localelen-3).toLowerCase() : locale.toLowerCase();
		return language;
	},
	
	/**
	 * Function to get the window resolution.
	 */
	loadBreakpointSettings : function() {	
		var desktopQuery = "(min-width: 1024px)";	
		var tabletPortraitQuery = "(max-width: 1024px) and (min-width: 799px)";	
		//var tabletLandscapeQuery = "(max-width: 639px) and (min-width: 400px)";
		var tabletLandscapeQuery = "(max-width: 799px) and (min-width: 400px)";
		var smartphoneQuery = "(max-width: 599px) and (min-width: 0px)";	
		var supportMediaQueries = (window.Modernizr) ? Modernizr.mq("only all") : false;
		this.desktop = (supportMediaQueries) ? Modernizr.mq(desktopQuery) : true;		
		this.tabletPortrait = (supportMediaQueries) ? Modernizr.mq(tabletPortraitQuery) : false;		
		this.tabletLandscape = (supportMediaQueries) ? Modernizr.mq(tabletLandscapeQuery) : false;		
		this.smartphone = (supportMediaQueries) ? Modernizr.mq(smartphoneQuery) : false;	
	}
},/* @prototype */{});

});