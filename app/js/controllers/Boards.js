(function(app) {

  "use strict";

  app.controller("BoardsController", ["$scope", "BoardService", "TransitionalAlertService",
    function($scope, BoardService, TransitionalAlertService) {

      function handleAlerts() {
        var alerts = TransitionalAlertService.popAlerts;
        if (alerts.length > 0) {
          $scope.successAlerts = alerts.filter(function(alert) {
            return (alert.type === "success");
          });
        }
      }

      function loadBoards() {
        BoardService.getBoards().then(function(boards) {
          $scope.boards = boards;
        });
      }

      handleAlerts();
      loadBoards();

    }
  ]);

}(app));
