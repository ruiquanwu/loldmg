lolDmgApp.controller('SummonerController', 
  function SummonerController($scope, $routeParams, $route){
    $scope.message = "hello summoner controller";
    $scope.summoner_name = $routeParams.summoner_name;

    $scope.reload = function() {
      $route.reload();
    };
    console.log($scope.message);
});