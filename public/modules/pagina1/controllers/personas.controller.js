'use strict';

// Articles controller
var app= angular.module('personas').controller('personaController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
  function($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    }
]);
app.factory("personas", ['$http', function($http) {
  var serviceBase = 'http://pdp6:85/backEnd/model/administracion/personas.php/'
    var obj = {};
    obj.getPersonas = function(){
        return $http.get(serviceBase + 'listaPersonas');
    };
    obj.insertarPersona = function (animal) {
      return $http.post(serviceBase + 'nuevoAnimal', animal).then(function (results) {
        return results;
      });
    };
    obj.modificarPersona = function (animal) {
      console.log(animal);
      return $http.post(serviceBase + 'editAnimales', animal).then(function (status) {
        return status.data;
      });
    };
    return obj;   
}]);

app.controller('PersonasController', function ($scope,personas) {
    personas.getPersonas().then(function(data){
        $scope.personas = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.personas.length; //Initially for no filter
        $scope.totalItems = $scope.personas.length;
    });
    
    $scope.setPage = function(pageNo) {
      $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
      $timeout(function() {
        $scope.filteredItems = $scope.filtered.length;
      }, 10);
    };
    $scope.sort_by = function(predicate) {
      $scope.predicate = predicate;
      $scope.reverse = $scope.reverse;
    };

    $scope.GuardarAnimal = function(animal){
      personas.insertarPersona(animal);
    }
    $scope.obtAnimal = function(idAn){
      /*services.getCustomer(idAn).then(function(animal){
        $scope.animal = animal.data;
      });*/
      alert(idAn);  
    }
    $scope.modificarAnimal = function(animal){
      personas.modificarPersona(animal);
    }
});
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);