steal(
   'can',
   'cookbook/models/service/recipe.js',
   'cookbook/models/createModel.js',
   'cookbook/common/resources.js',
   './views/initCreate.mustache',

   'jquerypp/dom/form_params',
   function(can, Recipe, CreateModel, ResourceManager, initView) {
      return can.Control.extend(
         /** @static */
         {
            defaults: {
               model: new CreateModel()
            }
         },

         /** @prototype */
         {
            init: function() {
               this.loadView();
            },

            loadView: function() {
               var frag = initView({
                  translations: ResourceManager.translations && ResourceManager.translations.createComponent
               });

               this.element.html(frag);
            },

            submit: function($element, $event) {
               $event.preventDefault();

               var errors = this.options.model.errors();

               if (!errors)
               {
                  $element.find('[type=submit]').val(ResourceManager.translations.createComponent.creating);

                  new Recipe(this.options.model.attr()).save(function() {
                     $element.find('[type=submit]').val(ResourceManager.translations.createComponent.create);
                     $element[0].reset();

                     // TODO why is this not clearing the model!!!!
                     //this.options.model = new CreateModel();

                     $.each(this.options.model.attr, function(key, value) {
                        this.options.model.attr(key, '');
                     });
                  });

                  this.reset();
               }
               else
               {
                  // Map each error to it's corresponding field "_err" div.
                  $.each(errors, function(key, value) {
                     $("#" + key + "_err").html(value).show();
                  });
               }
            },

            reset: function($element, $event) {
               $(".error").hide();
               $("#panelCreate").slideUp();
            },

            // Move any changes to the screen into the presentation
            // (createModel)
            'change': function($element, $event) {
               this.options.model.attr($element.formParams());
            },

            '#newRecipe click': function($element, $event) {
               $("#panelCreate").slideDown();
            }
         }
      );
   }
);
