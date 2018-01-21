(function(app) {

  "use strict";

  app.controller("BoardsController", ["$scope", "BoardService",
    function($scope, BoardService) {

      BoardService.getBoards().then(function(boards) {
        $scope.boards = boards;
      });

    }
  ]);

}(app));
