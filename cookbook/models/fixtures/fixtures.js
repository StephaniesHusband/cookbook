steal(
   "can",
	"can/util/fixture", 
	function(can, fixture) {

      var store = fixture.store(3, function(i) {
         return {
            id: i,
            name: "recipe "+i,
            description: "recipe " + i
         };
      });

      can.fixture({
         'GET /recipes' : store.findAll,
         'GET /recipes/{id}' : store.findOne,
         'POST /recipes' : store.create,
         'PUT /recipes/{id}' : store.update,
         'DELETE /recipes/{id}' : store.destroy
      });

      return store;
   }
);
