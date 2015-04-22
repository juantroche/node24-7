app.factory("servicesAccesos", ['$http', function($http) {
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

app.controller('accesosControler', function ($scope,servicesAccesos) {
    servicesAccesos.getCustomers().then(function(data){
        $scope.customers = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.usuarios.length; //Initially for no filter
        $scope.totalItems = $scope.usuarios.length;
    });

    $scope.GuardarAcceso = function(acceso){
      servicesAccesos.insertAccesos(acceso);
      servicesAccesos.getCustomers().then(function(data){
        $scope.customers = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.usuarios.length; //Initially for no filter
        $scope.totalItems = $scope.usuarios.length;
    });
    }
    servicesAccesos.getOpcion().then(function(data){
        $scope.ComboOpcion = data.data;
    });
    servicesAccesos.getRol().then(function(data){
        $scope.ComboRol = data.data;
    });

  
});


app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);