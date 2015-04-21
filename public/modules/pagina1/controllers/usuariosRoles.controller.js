'use strict';

// Articles controller
var app= angular.module('usuariosRoles').controller('usuariosRoleController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
  function($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;

    }
]);
app.factory("usuariosRoles", ['$http', function($http) {
  var serviceBase = 'http://pdp6:85/backEnd/model/administracion/usuariosRoles.php/'
    var obj = {};
    obj.getUsuariosRoles2 = function(){
        return $http.get(serviceBase + 'listaUsuariosRoles');
    };
    //********obteniendo roles
    obj.comboRoles = function(){
        return $http.get(serviceBase + 'listaRoles');
    }; 
    //********obteniendo personas
    obj.comboUsuarios = function(){
        return $http.get(serviceBase + 'listaUsuarios');
    }; 
    obj.insertUsuarioRol = function (usuarioRol) {
        //console.log(usuarioRol);
      return $http.post(serviceBase + 'nuevoUsuarioRol', usuarioRol).then(function (results) {
        return results;
      });
    };
    return obj;   
}]);

app.controller('UsuariosRolesController', function ($scope,usuariosRoles) {
    usuariosRoles.getUsuariosRoles2().then(function(data){
        $scope.usuariosRoles = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.usuariosRoles.length; //Initially for no filter
        $scope.totalItems = $scope.usuariosRoles.length;
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
    usuariosRoles.comboRoles().then(function(data){
        $scope.roles = data.data;
    });
    usuariosRoles.comboUsuarios().then(function(data){
        $scope.usuarios = data.data;
    });
    $scope.GuardarUsuarioRol = function(usuariosRoles){
        console.log(usuariosRoles);
        usuariosRoles.insertUsuarioRol(usuariosRoles);
    }
});
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);