steal(
   'funcunit', 
	'./create.js',
   'cookbook/models/service/recipe.js',
   'cookbook/common/resources.js',
	'cookbook/models/fixtures', 
	function (S, RecipeCreate, Recipe, ResourceManager, recipeStore ) {
      module("cookbook/components/recipe/create", {
         setup: function(){
            $("#qunit-test-area").append("<form id='create'></form>");
            new RecipeCreate("#create");
         },
         teardown: function(){
            $("#qunit-test-area").empty();
            recipeStore.reset();
         }
      });

      test("panel initially invisible", function() {
         S("#panelCreate").visible(function() {
            ok(test, "panel initially invisible");
         });
      });

      test("create recipes", function () {
         stop();
         
         Recipe.bind("created",function(ev, recipe) {
            ok(true, "Ice Water added");
            equals(recipe.name, "Ice Water",
               "name set correctly");
            equals(recipe.description, "Pour water in a glass. Add ice cubes.", 
               "description set correctly");
            start();
            Recipe.unbind("created",arguments.callee);
         })

         // click open the create panel
         S("#newRecipe").click();

         S.animationsDone();

         S("#panelCreate").visible(function() {
            S("[name=name]").type("Ice Water");
            S("[name=description]").type("Pour water in a glass. Add ice cubes.");
           
            // click create button
            S("[type=submit]").click();
           
            S("[type=submit]").val(ResourceManager.translations.createComponent.creating, "button text changed while created");
            S("[type=submit]").val(ResourceManager.translations.createComponent.create, function() {
               ok(true, "button text changed back after create");

               equals(S("[name=name]").val(), "", "form reset");
               equals(S("[name=description]").val(), "", "form reset");

               S("#panelCreate").invisible(function() {
                  ok(true, "Create panel is hidden");
               });
            });
         });
      });
   }
);
