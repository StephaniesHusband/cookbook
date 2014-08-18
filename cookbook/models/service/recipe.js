steal(
   'can',

   function (can) {
      /**
      * @constructor cookbook/models/recipe
      * @alias Recipe
      * @parent cookbook
      * @inherits can.Model
      *
      * Wraps backend recipe services.
      */
      return can.Model.extend(
         /* @static */
         {
            findAll: "GET /recipes",
            findOne: "GET /recipes/{id}",
            create: "POST /recipes",
            update: "PUT /recipes/{id}",
            destroy: "DELETE /recipes/{id}"
         },

         /* @Prototype */
         {
         }
      );
   }
);
