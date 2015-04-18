'use strict';

// Setting up route
angular.module('pagina1').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listPagina1', {
			url: '/pagina1',
			templateUrl: 'modules/pagina1/views/pagina1.view.html'
		}).
		state('listando', {
			url: '/pagina1/create',
			templateUrl: 'modules/pagina1/views/pagina2.view.html'
		});
	}
]);