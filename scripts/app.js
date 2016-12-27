var lolDmgApp = angular.module('lolDmgApp', ['ngResource', 'ngRoute', 'ngDialog', 'angular-toArrayFilter', 'ngSanitize', 'ui.bootstrap'])
  .config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: '/templates/pages/home/index.html'
      })
      .when('/summoner/:summoner_name', {
        templateUrl: '/templates/pages/summoner/index.html',
        controller: 'SummonerController',
        controllAs: 'SummonerCtrl'
      })
      .when('/dmgSimulation', {
        templateUrl: '/templates/pages/dmgSimulation/index.html'
      })
      .otherwise({redirectTo: '/summoner'});

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
