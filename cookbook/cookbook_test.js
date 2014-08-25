steal(
	'funcunit',

	'cookbook/models/service/recipe_test.js',
	'cookbook/components/recipe/create/create_test.js',
	'cookbook/components/recipe/list/list_test.js',
	function (S) {
   // the S Method is a copy of jQuery

	// this tests the assembly 
	module("cookbook", {
		setup : function () {
			S.open("//cookbook/development.html");
		}
	});
});
