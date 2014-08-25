steal(
	'funcunit',
	'cookbook/models/createModel_test.js',
	'cookbook/components/recipe/create/create_test.js',
	'cookbook/components/recipe/list/list_test.js',
	function (S) {

	// this tests the assembly 
	module("cookbook", {
		setup : function () {
			S.open("//cookbook/development.html");
		}
	});

	test("creating a recipes adds it to the list ", function () {
		
		S("[name=name]").type("Ice Water");
		S("[name=description]").type("Pour water in a glass. Add ice cubes.");
		
		S("[type=submit]").click();
		
		S("h3:contains(Ice Water)").exists();
		S("p:contains(Pour water in a glass. Add ice cubes.)").exists()
	});
});
