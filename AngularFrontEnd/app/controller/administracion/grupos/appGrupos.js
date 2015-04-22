//var app = angular.module('myApp2', ['ngRoute']);
app.factory("servicesGrupos", ['$http', function($http) {
    var obj = {};
    obj.getCustomers = function(a){
        url = a + 'administracion/grupos.php/';
        return $http.get(url + 'listagrupo');       
    };
    return obj; 
}]);

app.controller('gruposController', function ($scope,servicesGrupos, CONFIG) {
    servicesGrupos.getCustomers(CONFIG.APIURL).then(function(data){
        $scope.customers = data.data;
    });
    $scope.GuardarGrupos = function(grupos){
      servicesGrupos.insertCustomer(grupos);
    }
});

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);