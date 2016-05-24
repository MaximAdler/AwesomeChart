var chart = angular.module('chart', ['ngRoute']);
chart.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })

    .when('/apple', {
        templateUrl: 'pages/AAPL.html',
        controller: 'appleController'
    })

    .when('/google', {
        templateUrl: 'pages/GOOGL.html',
        controller: 'googleController'
    });
}]);
