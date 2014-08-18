steal("can", 
	'cookbook/common/properties.js',
	function(can, PropertiesManager){
	
	
	/**
	 * @constructor Resources
	 * @alias Resources
	 * @parent common
	 * 
	 * This will call the ApplicationResources.json.  
	 */
	return can.Construct.extend(
      /** @static */
      {
         translations: null,
         locale: PropertiesManager.locale,
         
         init: function() {
            if (!this.translations) {
               this.translations = this.getResourceFile("ApplicationResources.json");
               
               if($.isEmptyObject(this.translations)){
                  steal.dev.warn("There is a problem parsing ApplicationResources.json!!");
               } 
            }
         },

         sprint: function(str, o) {
            if (typeof str !== "string" || typeof o !== "object") {
               return;
            }
            var regex = /%s\(([a-zA-Z0-9_]{1,15})\)/g,
               i;
            if (regex.test(str)) {
               str = str.replace(regex, function (found, match) {
                     return o[match];
               });
            } else {
               for (i in o) {
                     str = str.replace(/%s/, o[i]);
               }
            }
            return str;
         },
         
         update: function() {
            this.locale = PropertiesManager.locale;
            this.translations = this.getResourceFile("ApplicationResources.json");
         },
      
         getResourceFile: function(filename) {
            //constants
            var language = this.locale.substring(0, 2).toLowerCase();
            var BASE_URL = location.protocol + "//" + location.host + "/cookbook/resources";
            
            var translationsJSON = {};
            
            $.ajaxSetup( { "async": false, "cache": false } );
            
            var fullLocaleSupportedList = (PropertiesManager && PropertiesManager.appProperties) ? PropertiesManager.appProperties.fullLocaleSupportedList : [];
            var folder = ($.inArray(this.locale.toLowerCase(), fullLocaleSupportedList) > -1) ? this.locale.toLowerCase() : language;
            var fullFileName = BASE_URL+"/"+folder+"/"+filename;
            var fullTranslationsDeffered = $.getJSON(fullFileName);
            fullTranslationsDeffered.done(function(data) {
               translationsJSON = data;
            });
            
            fullTranslationsDeffered.fail(function() {
               steal.dev.log("fullTranslationsDeffered failed for the file:" + fullFileName);
            });

            
            $.ajaxSetup( { "async": true } );
            
            return translationsJSON;
         },
      },
     
      /** @prototype */
      {
      }
   );
});
