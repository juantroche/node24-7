'use strict';

// Articles controller
var app= angular.module('estadosciviles').controller('estadoscivilesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
    function($scope, $stateParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;

    }
]);


//var app = angular.module('myApp', ['ngRoute']);
app.factory("estadosciviles", ['$http', function($http) {
  var serviceBase = 'http://pdp6:85/backEnd/model/administracion/estadosciviles.php/'
    var obj = {};
    obj.getCustomers = function(){
        return $http.get(serviceBase + 'listaEstadosCiviles');
    };
    obj.getCustomer = function(idAn){
      console.log(idAn);
        return $http.get(serviceBase + 'CargarAnimal/' + idAn);
    }
    obj.insertCustomer = function (animal) {
      return $http.post(serviceBase + 'nuevoAnimal', animal).then(function (results) {
        return results;
      });
    };
    obj.updateCustomer = function (id,customer) {
      console.log(id);
      console.log(customer);
      return $http.post(serviceBase + 'editAnimales', {id:id, customer:customer}).then(function (status) {
        return status.data;
      });
    };
    return obj;   
}]);

app.controller('estadosController', function ($scope,estadosciviles) {
    estadosciviles.getCustomers().then(function(data){
        $scope.customers = data.data;
    });


});

app.controller('controles',function ($scope, services){
  $scope.razas = ['Chapi','Akita','Chihuahua','Pastor Aleman','Labrador Retriever'];
  $scope.GuardarAnimal = function(animal){
    console.log(animal);
    //$location.path('/nuevoAnimal');
      estadosciviles.insertCustomer(animal);
      console.log(animal);
  }
});

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);