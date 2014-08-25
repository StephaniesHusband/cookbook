steal(
   'can', 
   'cookbook/common/properties.js',
   'cookbook/common/resources.js',

function(can, PropertiesManager, ResourceManager) {
   
   /**
    * @constructor Localer
    * @alias Localer
    * @parent common
    * 
    * This will help handle localizing numbers.  
    */
     
   return can.Construct.extend({
      calendarTranslations : null,
      locale : null,
      dateFormat : null,
      timeFormat : null,
      thousandSeparator : null,
      decimalSymbol : null,
      weightUnit : null,
      lengthUnit : null,
      calendarFormat : null,
      digitsAfterDecimal : null,
      // future use
        
      BASE_DECIMAL_SYMBOL : '.',
      BASE_THOUSAND_SEPARATOR : ',',
      DEFAULT_LOCALE : 'en_US',
      DEFAULT_EMAIL_LOCALE : 'en',
   
      localUnits : [],
      translatedmonthsArray : [],
      //shortMonthIndices : { "JAN":0, "FEB":1,"MAR":2,"APR":3,"MAY":4,"JUN":5,"JUL":6,"AUG":7,"SEP":8,"OCT":9,"NOV":10,"DEC":11},
      shortMonthIndices : { 0:"JAN", 1:"FEB",2:"MAR",3:"APR",4:"MAY",5:"JUN",6:"JUL",7:"AUG",8:"SEP",9:"OCT",10:"NOV",11:"DEC"},
      emailLocales : [],
   
      init : function() {
         this.addLocalUnit( 'cs'    , 'DD Mon. YYYY' , '24hh.mm'    , 'dd mmm. yyyy' , '.' , ',' , 'kg' , 'cm' ); // cs_CZ
         this.addLocalUnit( 'da'    , 'DD Mon. YYYY' , '24hh.mm'    , 'dd mmm. yyyy' , '.' , ',' , 'kg' , 'cm' ); // da_DK
         this.addLocalUnit( 'de'    , 'DD Mon YYYY'  , '24hh:mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' ); // de_DE
         this.addLocalUnit( 'en'    , 'mmm dd, yyyy' , '12hh.mm AM' , 'mmm dd, yyyy' , ',' , '.' , 'lb' , 'in' ); // en_US
         this.addLocalUnit( 'en_BE' , 'Mon DD, YYYY' , '24hh:mm'    , 'mmm dd, yyyy' , ',' , '.' , 'kg' , 'cm' );
         this.addLocalUnit( 'en_MX' , 'Mon DD, YYYY' , '12hh.mm AM' , 'Mon dd, yyyy' , ',' , '.' , 'kg' , 'cm' );
         this.addLocalUnit( 'en_US' , 'mmm dd, yyyy' , '12hh.mm AM' , 'mmm dd, yyyy' , ',' , '.' , 'lb' , 'in' ); // same as en , may be needed since it is the default
         this.addLocalUnit( 'es'    , 'DD Mon YYYY'  , '24hh:mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' ); // es_ES
         this.addLocalUnit( 'es_MX' , 'DD Mon YYYY'  , '12hh.mm AM' , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' );
         this.addLocalUnit( 'es_US' , 'mmm dd, yyyy' , '12hh.mm AM' , 'mmm dd, yyyy' , ',' , '.' , 'lb' , 'in' );
         this.addLocalUnit( 'fr'    , 'DD Mon. YYYY' , '24hh:mm'    , 'dd mmm. yyyy' , '.' , ',' , 'kg' , 'cm' ); // fr_FR
         this.addLocalUnit( 'fr_HT' , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' );
         this.addLocalUnit( 'hu'    , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' ); // hu_HU
         this.addLocalUnit( 'it'    , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' ); // it_IT
         this.addLocalUnit( 'nl'    , 'DD Mon. YYYY' , '24hh:mm'    , 'dd mmm. yyyy' , '.' , ',' , 'kg' , 'cm' ); // nl_NL
         this.addLocalUnit( 'pl'    , 'DD Mon. YYYY' , '24hh:mm'    , 'dd mmm. yyyy' , '.' , ',' , 'kg' , 'cm' ); // pl_PL
         this.addLocalUnit( 'pt'    , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' ); // pt_PT
         this.addLocalUnit( 'pt_br' , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' );
         this.addLocalUnit( 'ru'    , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' ); // ru_RU
         this.addLocalUnit( 'sv'    , 'DD Mon. YYYY' , '24hh.mm'    , 'dd mmm. yyyy' , '.' , ',' , 'kg' , 'cm' ); // sv_SE
         this.addLocalUnit( 'tr'    , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' ); // tr_TR
         
         this.addLocalUnit( 'es_es' , 'mmm dd, yyyy' , '12hh.mm AM' , 'mmm dd, yyyy' , '.' , ',' , 'kg' , 'cm' );
         this.addLocalUnit( 'fi'    , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' ); // not in SRS
         this.addLocalUnit( 'fr_ca' , 'DD Mon YYYY'  , '24hh:mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' );
         this.addLocalUnit( 'ja'    , 'YYYY Mon DD'  , '24hh.mm'    , 'yyyy mmm dd'  , ',' , '.' , 'kg' , 'cm' );
         this.addLocalUnit( 'ko'    , 'YYYY Mon DD'  , '24hh.mm'    , 'yyyy mmm dd'  , ',' , '.' , 'kg' , 'cm' );
         this.addLocalUnit( 'no'    , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , '.' , ',' , 'kg' , 'cm' ); // not in SRS
         this.addLocalUnit( 'th'    , 'DD Mon YYYY'  , '24hh.mm'    , 'dd mmm yyyy'  , ',' , '.' , 'kg' , 'cm' );
         this.addLocalUnit( 'zh_cn' , 'YYYY Mon DD'  , '24hh.mm'    , 'yyyy mmm dd'  , ',' , '.' , 'kg' , 'cm' );
         this.addLocalUnit( 'zh_tw' , 'YYYY Mon DD'  , '24hh.mm'    , 'yyyy mmm dd'  , ',' , '.' , 'kg' , 'cm' );
         
         var locale = (PropertiesManager.locale) ? PropertiesManager.locale : this.DEFAULT_LOCALE;
         this.setCurrentLocale( locale );
         this.calendarTranslations = ResourceManager.translations.calendar;
      },
      
      clearEmailLocales : function() {
            this.emailLocales = [];
      },
       
      addEmailLocale : function( locale ) {
            var localeKey = locale.toLowerCase();
            this.emailLocales[ localeKey ] = locale;
      },
       
      getValidEmailLocale : function( localeToTest ) {
         var localeKey = localeToTest.toLowerCase();
         var foundLocale = this.emailLocales[localeKey];
         if ( ! foundLocale ) {
               foundLocale = this.emailLocales[localeKey.substring(0,2)];
         }
         if ( ! foundLocale ) {
               foundLocale = this.DEFAULT_EMAIL_LOCALE;
         }
         steal.dev.log( 'Localer.getValidEmailLocale: '+ localeToTest +' --> '+ foundLocale );
         return foundLocale;
      },
        
      cxsToLocaleDate : function (cxsDate) {
         if(! cxsDate){return '';}
         var parts = cxsDate.split("-");
         if(parts.length < 3){ return cxsDate; }
         var month = parts[1]-1;
         var day = parts[2];
         var year = parts[0];
         var date = this.dateFormat;
         var monthStr = this.shortMonthInLocale(month);
         date = date.replace("Mon",monthStr).replace("DD",day).replace("YYYY",year);
         date = date.replace("mmm",monthStr).replace("dd",day).replace("yyyy",year);
         return date;
      },
      
      shortMonthInLocale : function (cxsMonth) {
         var result = cxsMonth;
         if(cxsMonth){
             if (this.translatedmonthsArray.length === 0) {
                var translatedMonths = this.calendarTranslations.shortMonths;
                this.translatedmonthsArray = translatedMonths.split(",");
             }
             if(cxsMonth !== -1){
                     result = this.translatedmonthsArray[cxsMonth];
             }
         }
         return result;
      },
        
      getMonthDigit : function(cxsMonth) {
         var result = -1;
         if(cxsMonth){
                 cxsMonth = $.trim(cxsMonth);
                 if (cxsMonth.length>3) {
                         cxsMonth = cxsMonth.substring(0,3);
                 }
                 cxsMonth = cxsMonth.toUpperCase();
                 result = this.shortMonthIndices[cxsMonth];
                 if (!result) { result = -1; }
         }
         return result;
      },
      
      setCurrentLocale : function( locale ) {
         //Update the resource with the selected locale
         ResourceManager.update();
            var localUnit = this.localUnits[locale];
            if ( ! localUnit ) {
                localUnit = this.localUnits[locale.substring(0,2)];
            }
            if ( ! localUnit ) {
                localUnit = this.localUnits[this.DEFAULT_LOCALE];
            }
            
            this.locale = localUnit.locale;
            steal.dev.log( 'Localer.setCurrentLocale: LocalUnit used: '+ this.locale );
         this.dateFormat = localUnit.dateFormat;
            this.timeFormat = localUnit.timeFormat;
            this.calendarFormat = localUnit.calendarFormat;
            this.thousandSeparator = localUnit.thousandSeparator;
            this.decimalSymbol = localUnit.decimalSymbol;
            this.weightUnit = localUnit.weightUnit;
            this.lengthUnit = localUnit.lengthUnit;
            this.calendarTranslations = ResourceManager.translations.calendar;
            this.translatedmonthsArray = "";
      },
        
      addLocalUnit : function ( locale, dateFormat, timeFormat,calendarFormat, thousandSeparator, decimalSymbol, weightUnit, lengthUnit ) {
         var localUnit = {
               locale : locale,
         dateFormat : dateFormat,
               timeFormat : timeFormat,
               calendarFormat : calendarFormat,
               thousandSeparator : thousandSeparator,
               decimalSymbol : decimalSymbol,
               weightUnit : weightUnit,
               lengthUnit : lengthUnit
         };
         this.localUnits[locale] = localUnit;
         return localUnit;
      },
        
      /**
       * Converts a numeric string to float number. 
       * Like Javascript's parseFloat except it cannot contain non-numeric characters except for the locale's thousand separator or decimal symbol.
       * @param {String} str string representing a number
       * @returns {Number} integer or NaN if string contains bad characters
       */
      parseFloat : function( str ) {
         str = this.stripThousands( str );
         var locDecimalSymbol = this.decimalSymbol;
         if ( locDecimalSymbol !== this.BASE_DECIMAL_SYMBOL ) {
               var locPos = str.indexOf( locDecimalSymbol );
               if ( locPos >= 0 ) {
                  str = str.substring(0,locPos) + this.BASE_DECIMAL_SYMBOL + str.substring(locPos+1);
               }
         }
         var value = Number(str).valueOf();
         return value;
      },
       
      /**
       * Converts a numeric string to an integer. 
       * Like Javascript's parseInt except it cannot contain non-numeric characters except for the locale's thousand separator.
       * @param {String} str string representing an integer number - cannot contain a decimal place
       * @returns {Number} integer or NaN if string contains bad characters or a decimal place
       */
      parseInt : function( str ) {
         str = this.stripThousands( str );
         var value = Number.NaN;
         if ( str.indexOf( this.decimalSymbol ) < 0 ) {
               value = Number( str ).valueOf();
         }
         return value;
      },
      
      convertDecimalSeparator : function( str, toLocale ) {
         var locDecimalSymbol = this.decimalSymbol,
             locPos;
         if ( locDecimalSymbol !== this.BASE_DECIMAL_SYMBOL ) {
            if ( toLocale ) {
               locPos = str.indexOf( this.BASE_DECIMAL_SYMBOL );
               if ( locPos >= 0 ) {
                  str = str.substring(0,locPos) + locDecimalSymbol + str.substring(locPos+1);
               }
            } else {
               locPos = str.indexOf( locDecimalSymbol );
               if ( locPos >= 0 ) {
                  str = str.substring(0,locPos) + this.BASE_DECIMAL_SYMBOL + str.substring(locPos+1);
               }
            }
         }
         return str;
      },
      
      /**
      * Like Javascript's Number.toString() except any resulting non-integer will contain the locale's decimal symbol.
      * @param {String|Number} value number or string representing a number - can contain thousands separator
      * @returns {String} numeric string possibly with locale's decimal symbol
      */
      numberToString : function( value ) {  
         var decimalSeparatorPostfix = '';
         if ( value.substring ) {        // if is a String
            if ( value === '' ) {
               return value;
            }
            var lastChar = value.charAt(value.length-1); //substr fails for IE8 & below!
            if ( lastChar === this.decimalSymbol ) {
               decimalSeparatorPostfix = lastChar;
            }
            value = this.stripThousands( value );
            value = this.convertDecimalSeparator( value, false );
         }

         var str = Number( value ).toString();
         str = this.convertDecimalSeparator( str, true );
         str = this.insertThousands( str );
         str += decimalSeparatorPostfix;

         return str;
      },
        
      /**
       * Converts a number or numeric string to one that has a fixed maximum number of decimal places. 
       * Any existing decimal symbol must be same as the locale's decimal symbol, as will the resulting string.
       * @param {String|Number} value number or string representing a number - can contain thousands separator
       * @param {Number} digits number of maximum decimal places
       * @returns {String} numeric string with maximum number of decimal places
       */
      numberToFixedMax : function( value, digits ) {
         if ( value.substring ) {        // if is a String
            if ( value === '' ) {
               value = '0';
            }
            value = this.stripThousands( value );
            value = this.convertDecimalSeparator( value, false );
         }

         var str = Number( value ).toFixed( digits );
         str = Number( str ).toString();
         str = this.convertDecimalSeparator( str, true );
         str = this.insertThousands( str );

         return str;
      },
       
      /**
      * Converts a number or numeric string to one that has a fixed number of decimal places. 
      * Any existing decimal symbol must be same as the locale's decimal symbol, as will the resulting string.
      * @param {String|Number} value number or string representing a number - can contain thousands separator
      * @param {Number} digits number of decimal places
      * @returns {String} numeric string with fixed number of decimal places
      */
      numberToFixed : function( value, digits ) {
         if ( value.substring ) {        // if is a String
            if ( value === '' ) {
               value = '0';
            }
            value = this.stripThousands( value );
            value = this.convertDecimalSeparator( value, false );
         }
         var str = Number( value ).toFixed( digits );
         
         str = this.convertDecimalSeparator( str, true );
         str = this.insertThousands( str );
         return str;
      },
   
      /**
       * Inserts thousands separators into a numeric string
       * @param {String} str numeric string that can have decimal places, and can even already have thousand separators
       * @returns
       */
      insertThousands : function( str ) {
         str = this.stripThousands( str );
         var thousPos = str.length;
         var locPos = str.indexOf( this.decimalSymbol );
         if ( locPos >= 0 ) {
            thousPos = locPos;
         }
         for ( var reps=0; reps<4 && thousPos>0; reps++ )
         {
            for ( var i=0; i<3; i++ ) {
               thousPos--;
            }
            if ( thousPos > 0 ) {
               str = str.substring(0,thousPos) + this.thousandSeparator + str.substring(thousPos);
            }
         }
         return str;
      },
        
      // TODO: next 2 methods: name param 'value' and derive str from, call convertDecimalSeparator, and document value param
      /**
       * Strips out any thousands separators and converts the locale's decimal symbol to JavaScript's base decimal symbol (.)
       * @param {String} str the numeric string that may contain thousand separators and/or a decimal point
       * @returns {String} scrubed numerical string that may contain a decimal point
       */
      normalizeNumberString : function( str ) {
         if(str === undefined || str === null || str === "") {
            return "";
         }

         if ( ! str.substring ) {        // if is not a String
               str = Number( str ).toString();
         }
         str = this.stripThousands( str );
         var locDecimalSymbol = this.decimalSymbol;
         if ( locDecimalSymbol !== this.BASE_DECIMAL_SYMBOL ) {
            var locPos = str.indexOf( locDecimalSymbol );
            if ( locPos >= 0 ) {
               str = str.substring(0,locPos) + this.BASE_DECIMAL_SYMBOL + str.substring(locPos+1);
            }
         }
         
         var result = Number(str);
         return isNaN(result)? "":result;
      },
        
      /**
       * Converts JavaScript's base decimal symbol (.) to the locale's decimal symbol and adds any locale thousands separators
       * @param {String} str the base Javascript numeric string that may contain a decimal point
       * @returns {String} scrubed numerical string that may contain a decimal point and/or  thousand separators
       */
      localizeNumberString : function( str, digits ) {
         str = str || 0;
         if(str === undefined || str === null || str === ""){
            return "";
         }
         str = this.normalizeNumberString(str);
         if(isNaN(str)){
            return "";
         }
         if ( ! str.substring ) {        // if is not a String
            str = Number( str ).toString();
         }
         if ( str === '' ) {
            str = '0';
         }
         if ( digits ) {
            var locThousandSeparator = this.thousandSeparator;
            if(locThousandSeparator === this.BASE_THOUSAND_SEPARATOR){
               str = str.replace(/[ ,]/g,""); //Removing the thousand separator
               str = Number( str ).toFixed( digits );
            }
            if(locThousandSeparator !== this.BASE_THOUSAND_SEPARATOR){
               this.digitsAfterDecimal = '00';
               var decimalPos = str.indexOf( this.decimalSymbol );
               if ( decimalPos >= 0 ) {
                  this.digitsAfterDecimal = str.substring(decimalPos+1);
                  str = str.substring(0,decimalPos); //Removing digits after decimal symbol ','
               }
               str = str.replace(/[ .]/g,""); //Removing the thousand separator
               str = Number( str ).toFixed( digits );
            }
         }
         var locDecimalSymbol = this.decimalSymbol;
         if ( locDecimalSymbol !== this.BASE_DECIMAL_SYMBOL ) {
            var locPos = str.indexOf( this.BASE_DECIMAL_SYMBOL );
            if ( locPos >= 0 ) {
               if(this.digitsAfterDecimal !== '00' && this.digitsAfterDecimal !== null && this.digitsAfterDecimal !== undefined){
                     str = str.substring(0,locPos) + locDecimalSymbol + this.getDigitAfterDecimal(this.digitsAfterDecimal);
               }
               else{
                  str = str.substring(0,locPos) + locDecimalSymbol + str.substring(locPos+1);
               }
            }
         }
         str = this.insertThousands( str );
         return str;
      },
        
      getDigitAfterDecimal : function(str){
         if(str.length < 2){
            str = str + '0';
         }
         else if(str.length > 2){
            str = str.substring(0,1);
         }
         return str;
      },
        
      /**
       * Strips out any thousands separators
       * @param {String} str the numeric string that may contain thousand separators
       * @returns {String} scrubed numerical string that may contain a decimal symbol
       */
      stripThousands : function( str ) {
         while ( str ) {
            var locPos = str.indexOf( this.thousandSeparator );
            if ( locPos < 0 )  { break; }
            str = str.substring(0,locPos) + str.substring(locPos+1);
         }
         return str;
      },
        
      /**
       * Strips out any non-numeric characters of a string.
       * To be used to scrub phone number or its extension.
       * WARNING: may be slightly expensive.
       * @param {String} str the phone number or extension to scrub
       * @returns {String} the resulting numeric string
       */
      stripPhone : function( str ) {
         var newStr = '';
         if ( str ) {
            for ( var i=0; i<str.length; i++ ) {
               var ch = str.substr( i, 1 );
               if ( $.isNumeric(ch) ) {
                  newStr += ch;
               }
            }
         } else {
            newStr = str;
         }
         return newStr;
      },
      
      isValidDecimalNumber : function (input) {
         var value = this.stripThousands( input );
         var regexp = '^[0-9]*(\\'+ this.decimalSymbol +'[0-9]{0,1})?$';
         return (new RegExp(regexp).test(value));
      },

      isSingleDecimalNumber : function (input) {
         var value = this.stripThousands( input );
         var regexp = '^[0-9]*(\\'+ this.decimalSymbol +'[0-9]{0})?$';
         return (new RegExp(regexp).test(value));
      }
   },
   /** @prototype */ 
   {});
});
