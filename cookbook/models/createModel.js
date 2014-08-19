steal(
   'can',
   'cookbook/common/resources.js',

   'can/observe/validations',
   'can/observe/attributes',

   function(can, ResourceManager) {
      return can.Observe.extend(
         /** @static */
         {
            attributes: {
               name: 'string',
               description: 'string',
            },

            init: function() {
               // Change the default "required" error message
               can.Observe.validationMessages.presence = ResourceManager && ResourceManager.translations.commonComponents.required;

               // Make sure we have a value for required fields
               this.validatePresenceOf(['name', 'description']);
            }
         },

         /** @prototype */
         {
         }
      );
   }
);
