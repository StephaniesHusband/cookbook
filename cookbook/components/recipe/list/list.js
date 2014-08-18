steal(
   'can',
   'cookbook/models/service/recipe.js',
   'cookbook/common/resources.js',
   './views/initList.mustache',
   function(can, Recipe, ResourceManager, initView) {
      return can.Control.extend(
         /** @static */
         {
            defaults: {
               // We apparently must "use" the Recipe object for the "class" to
               // be able to respond to the event below.
               Recipe: Recipe
            }
         },
         /** @prototype */
         {
            init: function() {
               // load our view
               this.loadView();
            },

            loadView: function() {
               // fire up the mustache template and pass it the list of recipes
               var frag = initView({
                  recipes: this.options.recipes,
                  translations: ResourceManager.translations && ResourceManager.translations.listComponent,
               });

               this.element.html(frag);
            },

            // Handle any and all of the destroy link clicks
            '.destroy click': function($element) {
               var r = $element.closest('.recipe').data('recipe');

               if (r && confirm(ResourceManager.sprint(ResourceManager.translations.listComponent.confirmDel, [ r.name ]))) {
                  r.destroy();
               }
            },

            // Note we have to use the Recipe "class" above so that we can see
            // these events!
            '{Recipe} created': function(list, ev, recipe) {
               this.options.recipes.push(recipe);
            }
         }
      );
   }
);
