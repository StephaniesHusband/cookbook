steal(
   // Find a indentation convention and stick to it.
   'can',                               // always include can first
	'cookbook/components/recipe/create', // steal each of the "classes" needed
	'cookbook/components/recipe/list',   // "
	'cookbook/models/service/recipe.js', // steal the recipe service model
	'cookbook/common/properties.js',     // steal the properties file

   // Convention: skip a line between the modules that return objects and the
   // ones that do not.
	'cookbook/models/fixtures', // include fixtures file - ask ryan how this gets turned on/off
function(can, RecipeCreate, RecipeList, Recipe, Properties) {
// each of the above parameters should match up with the stolen dependencies
// above.  Convention is to make "can" lowerase but the objects that you will
// "new" are considered "classes" and will be captitalized.  The names of the
// parameters are arbitrary but stick to a convention and be consisten.

   // This is probably the only place you have a jQuery document.ready--i.e.,
   // the main app entry point.
	$(document).ready(function() {
      // I'm not sure what these are.
		Properties.loadBreakpointSettings();

      // This is loading up the main DB for the app--it can be from any storage
      // or AJAX/REST call.  Use a deferred because you don't know when it's
      // going to return.
      var deferred = Recipe.findAll();

      // Handle the "done" event of the deferred.
      // TODO: Unsure about the can.proxy (read up on that).
      deferred.done(can.proxy(function(response) {
         // Create controllers for each of your app's modules and bind them to
         // the appropriate selectors. Pass any data to them needed--this data
         // will be usable inside the module under "this.options".
         new RecipeList("#list", { recipes: response });
         new RecipeCreate("#create");
      }, this));
	});
});
