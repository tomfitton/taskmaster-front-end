(function() {

  "use strict";

  app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/", {
      "templateUrl": "boards.html",
      "controller": "BoardsController"
    });
  }]);

}());
