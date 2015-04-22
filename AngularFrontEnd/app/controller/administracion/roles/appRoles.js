app.factory("servicesRoles", ['$http', function($http) {
  var serviceBase = 'http://pdp6:85/backEnd/model/administracion/roles.php/'
    var obj = {};
    obj.getRoles = function(){
        return $http.get(serviceBase + 'listaRoles');
    };
    return obj;   
}]);

app.controller('RolesController', function ($scope,servicesRoles) {
    servicesRoles.getRoles().then(function(data){
        $scope.roles = data.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.roles.length; //Initially for no filter
        $scope.totalItems = $scope.roles.length;
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
});

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);