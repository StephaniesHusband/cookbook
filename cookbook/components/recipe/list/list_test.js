steal(
	'funcunit',
	'./list.js',
	'cookbook/models/service/recipe.js',
	'cookbook/models/fixtures',
	function(S, RecipeList, Recipe, recipeStore ) {
      module("cookbook/recipe/list", { 
         setup: function() {
            $("#qunit-test-area").append("<div id='recipes'></div>");

            var deferred = Recipe.findAll();

            deferred.done(can.proxy(function(response) {
               new RecipeList("#recipes", { recipes: response });
            }, this));
         },
         teardown: function(){
            $("#qunit-test-area").empty();
            recipeStore.reset();
         }
      });
      
      asyncTest("lists all recipes", function(){
         // retrieve recipes
         Recipe.findAll({}, function(recipes){
            // make sure they are listed in the page
            
            S(".recipe").size(recipes.length,function(){
               ok(true, "All recipes listed");
               
               start();
            })
         })
      });
      
      asyncTest("delete recipe", function(){
         new Recipe({
            name: "Ice Water",
            description: "mix ice and water"
         }).save(function() {

            // wait until ice water has been added
            S("h3:contains('Ice Water X')").exists("Ice Water exists");

            start();

            S.confirm(true);
            S('h3:last a').click();

            S("h3:contains('Ice Water')").missing("Ice Water Removed");
         });
      });

      asyncTest("lists created recipes", function(){
         new Recipe({
            name: "Grilled Cheese",
            description: "grill cheese in bread"
         }).save(function() {
            S("h3:contains('Grilled Cheese X')").exists("Lists created recipe");

            start();
         });
      });
   }
);
