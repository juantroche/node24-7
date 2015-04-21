'use strict';

// Configuring the Articles module
angular.module('pagina1').run(['Menus',
	function(Menus) {
	
	console.log(Menus);
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'GRILLAS*', 'pagina1', 'dropdown', '/pagina1(/create)?');
		//Menus.addSubMenuItem('topbar', 'pagina1', 'List Articles', 'pagina1');
		//Menus.addSubMenuItem('topbar', 'pagina1', 'New Article', 'pagina1/create');
		Menus.addSubMenuItem('topbar', 'pagina1', 'Usuarios', 'usuarios');
		Menus.addSubMenuItem('topbar', 'pagina1', 'Accesos', 'accesos');
		Menus.addSubMenuItem('topbar', 'pagina1', 'grupos', 'grupos');
		Menus.addSubMenuItem('topbar', 'pagina1', 'personas', 'personas');
		Menus.addSubMenuItem('topbar', 'pagina1', 'roles', 'roles');
		Menus.addSubMenuItem('topbar', 'pagina1', 'usuariosRoles', 'usuariosRoles');
	}
]);

