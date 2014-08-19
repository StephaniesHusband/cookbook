steal('can',
      'can/util/fixture',
   function(can) {

   var store = can.fixture.store(3, function(i) {
      return {
         id: i,
         name: "recipe "+i,
         description: "recipe " + i
      };
   });

   can.fixture({
      //'GET /recipes' : store.findAll,
      'GET /recipes/{id}' : store.findOne,
      'POST /recipes' : store.create,
      'PUT /recipes/{id}' : store.update,
      'DELETE /recipes/{id}' : store.destroy
   });

   can.fixture("GET /recipes", '/cookbook/models/fixtures/fixtureData.json');

   return store;
});
