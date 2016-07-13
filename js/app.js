var chart = angular.module('chart', ['ngRoute']);
chart.config(['$routeProvider', function($routeProvider) {
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })

    .when('/AAPL', {
        templateUrl: 'pages/AAPL.html',
        controller: 'appleController'
    })

    .when('/GOOGL', {
        templateUrl: 'pages/GOOGL.html',
        controller: 'googleController'
    })

    .when('/Info',{
      templateUrl: 'pages/Info.html',
      controller: 'infoController'
    });
}]);
