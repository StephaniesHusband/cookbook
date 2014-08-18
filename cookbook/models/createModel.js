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
               can.Observe.validationMessages.presence = ResourceManager && ResourceManager.translations.commonComponents.required;

               this.validatePresenceOf(['name', 'description']);
            }
         },

         /** @prototype */
         {
         }
      );
   }
);
