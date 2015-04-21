'use strict';

// Setting up route
angular.module('pagina1').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		/*state('listPagina1', {
			url: '/pagina1',
			templateUrl: 'modules/pagina1/views/pagina1.view.html'
		}).
		state('listando', {
			url: '/pagina1/create',
			templateUrl: 'modules/pagina1/views/pagina2.view.html'
		}).*/
		state('listaA', {
			url: '/usuarios',
			templateUrl: 'modules/pagina1/views/usuarios.view.html'
		}).
		state('listaB', {
			url: '/accesos',
			templateUrl: 'modules/pagina1/views/accesos.view.html'
		}).
		state('listaC', {
			url: '/grupos',
			templateUrl: 'modules/pagina1/views/grupos.view.html'
		}).
		state('listaD', {
			url: '/personas',
			templateUrl: 'modules/pagina1/views/personas.view.html'
		}).
		state('listaE', {
			url: '/roles',
			templateUrl: 'modules/pagina1/views/roles.view.html'
		}).
		state('listaF', {
			url: '/usuariosRoles',
			templateUrl: 'modules/pagina1/views/usuariosRoles.view.html'
		});

	}
]);