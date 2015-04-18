'use strict';

var app= angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
app.controller("NavCtrl",function($scope, $http, $rootScope){
    var urlmenu = 'http://pdp6:85/backEnd/model/administracion/opciones.php';
    $http.get(urlmenu + '/menu/1').then(function (results) {
        $scope.categories = results.data;
    });
});