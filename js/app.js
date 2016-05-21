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

          .when('/GOOGLE', {
              templateUrl : 'pages/GOOGLE.html',
              controller  : 'googleController'
          });
  });
