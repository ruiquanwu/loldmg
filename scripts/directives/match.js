lolDmgApp.directive('matchInfo', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/match/index.html'
  };
});

lolDmgApp.directive('matchChampions', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/match/matchChampions.html'
  };
});

lolDmgApp.directive('matchVsLine', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/match/matchVsLine.html'
  };
});