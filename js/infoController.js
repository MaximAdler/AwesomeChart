var chart = angular.module('chart')

chart.controller('infoController',['$scope','$http',function($scope,$http){
  $scope.message = 'Table with info about maximum Price and year of creation of StockCompanies';

  $scope.sortType     = 'name';
  $scope.sortReverse  = false;
  $scope.searchStock  = '';

  $http.get('./companies.json').success(function(data){
    $scope.companies = data;
  });
}])
