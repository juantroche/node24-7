'use strict';

// Articles controller
var app= angular.module('accesos').controller('accesoController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
    function($scope, $stateParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;

    }
]);

app.factory("accesos", ['$http', function($http) {
  var serviceBase = 'http://pdp6:85/backEnd/model/administracion/accesos.php/'
    var obj = {};
    obj.getCustomers = function(){
        return $http.get(serviceBase + 'listaaccesos');
    };

    obj.getOpcion = function(){
        return $http.get(serviceBase + 'listaOpcion');
    }; 

    obj.getRol = function(){
        return $http.get(serviceBase + 'listaRol');
    }; 
     obj.insertAccesos = function (acceso) {
      return $http.post(serviceBase + 'nuevoAcceso', acceso).then(function (results) {
        return results;
      });
    };

    return obj;   
}]);

app.controller('accesosControler', function ($scope,accesos) {
    accesos.getCustomers().then(function(data){
        $scope.customers = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.usuarios.length; //Initially for no filter
        $scope.totalItems = $scope.usuarios.length;
    });

    $scope.GuardarAcceso = function(acceso){
      accesos.insertAccesos(acceso);
      accesos.getCustomers().then(function(data){
        $scope.customers = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.usuarios.length; //Initially for no filter
        $scope.totalItems = $scope.usuarios.length;
    });
    }
    accesos.getOpcion().then(function(data){
        $scope.ComboOpcion = data.data;
    });
    accesos.getRol().then(function(data){
        $scope.ComboRol = data.data;
    });

  
});


app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);