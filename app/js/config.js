(function() {

  "use strict";

  app.config(["$routeProvider", "$locationProvider",
    function($routeProvider, $locationProvider) {
      $locationProvider.hashPrefix("");

      $routeProvider
      .when("/", {
        "templateUrl": "boards.html",
        "controller": "BoardsController"
      })
      .when("/board/create", {
        "templateUrl": "create-board.html"
      });
    }
  ]);

}());
