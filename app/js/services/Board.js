(function() {

  "use strict";

  app.service("BoardService", ["$http", function($http) {

    var API = "http://taskmaster.tomfitton.co.uk:8080/api";

    this.getBoards = function() {
      return $http.get(API + "/board").then(function(response) {
        return response.data;
      });
    };

  }]);

}());
