'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('pagina1').factory('Pagina1', ['$resource',
	function($resource) {
		return $resource('pagina1/:pagina1Id', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);