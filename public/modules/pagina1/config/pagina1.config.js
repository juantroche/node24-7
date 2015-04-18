'use strict';

// Configuring the Articles module
angular.module('pagina1').run(['Menus',
	function(Menus) {
	
	console.log(Menus);
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pagina1', 'pagina1', 'dropdown', '/pagina1(/create)?');
		Menus.addSubMenuItem('topbar', 'pagina1', 'List Articles', 'pagina1');
		Menus.addSubMenuItem('topbar', 'pagina1', 'New Article', 'pagina1/create');
		Menus.addSubMenuItem('topbar', 'pagina1', 'New Article', 'pagina1/create');
	}
]);