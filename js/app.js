  var chart = angular.module('chart', ['ngRoute']);

  chart.config(function($routeProvider) {
      $routeProvider

          .when('/', {
              templateUrl : 'pages/home.html',
              controller  : 'mainController'
          })

          .when('/AAPL', {
              templateUrl : 'pages/AAPL.html',
              controller  : 'appleController'
          })

          .when('/GOOGL', {
              templateUrl : 'pages/GOOGL.html',
              controller  : 'googleController'
          });
  });
