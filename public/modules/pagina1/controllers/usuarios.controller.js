'use strict';

// Articles controller
var app= angular.module('usuarios').controller('usuarioController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
  function($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;

    }
]);
app.factory("usuarios", ['$http', function($http) {

    var serviceBase = 'http://pdp6:85/backEnd/model/administracion/usuarios.php/'

    var obj = {};
    obj.getUsuarios = function(){
        return $http.get(serviceBase + 'listaUsuarios');
    };
    //********obteniendo personas
    obj.comboPersonas = function(){
        return $http.get(serviceBase + 'listaPersonas');
    }; 
    //*******registro Usuario
    obj.insertUsuario = function (usuario) {
        console.log(usuario);
      return $http.post(serviceBase + 'nuevoUsuario', usuario).then(function (results) {
        return results;
      });
    };
    return obj;   
}]);

app.controller('UsuariosController', function ($scope,usuarios) {

    usuarios.getUsuarios().then(function(data){
        $scope.usuarios = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.usuarios.length; //Initially for no filter
        $scope.totalItems = $scope.usuarios.length;
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
    usuarios.comboPersonas().then(function(data){
        $scope.personas = data.data;
    });
    $scope.GuardarUsuario = function(usuario){
        usuarios.insertUsuario(usuario);
        usuarios.getUsuarios().then(function(data){
            $scope.usuarios = data.data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 5; //max no of items to display in a page
            $scope.filteredItems = $scope.usuarios.length; //Initially for no filter
            $scope.totalItems = $scope.usuarios.length;
        });
    }
});
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
