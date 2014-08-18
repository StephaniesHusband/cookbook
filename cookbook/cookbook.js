steal(
   'can',
	'cookbook/components/recipe/create',
	'cookbook/components/recipe/list',
	'cookbook/models/service/recipe.js',
	'cookbook/common/properties.js',
	
   'cookbook/css/styles.css',
	'cookbook/models/fixtures',
function(can, RecipeCreate, RecipeList, Recipe, Properties){
		
	$(document).ready(function() {
		Properties.loadBreakpointSettings();

      var deferred = Recipe.findAll();

      deferred.done(can.proxy(function(response) {
         new RecipeList("#list", { recipes: response });
         new RecipeCreate("#create");
      }, this));
	});
});
