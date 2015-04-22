app.factory("servicesOpciones", ['$http', function($http) {
  var serviceBase = 'http://pdp6:85/backEnd/model/administracion/opciones.php/'
    var obj = {};
    obj.getCustomers = function(){
        return $http.get(serviceBase + 'listaOpciones');
    };
    obj.insertCustomer = function (opciones) {
      return $http.post(serviceBase + 'nuevaOpcion', opciones).then(function (results) {
        return results;
      });
    };
    obj.getCustomersGrupos = function(){
        return $http.get(serviceBase + 'listaGrupos');
    }; 
  
    return obj;   
}]);

app.controller('opcionesController', function ($scope,servicesOpciones) {
    servicesOpciones.getCustomers().then(function(data){
        $scope.customers = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.customers.length; //Initially for no filter
        $scope.totalItems = $scope.customers.length;
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

    $scope.GuardarOpciones = function(opciones){
      servicesOpciones.insertCustomer(opciones);
       servicesOpciones.getCustomers().then(function(data){
        $scope.customers = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.customers.length; //Initially for no filter
        $scope.totalItems = $scope.customers.length;
      });
    }
    services.getCustomersGrupos().then(function(data){
        $scope.ComboCustomersGrupos = data.data;
    });


});



app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);