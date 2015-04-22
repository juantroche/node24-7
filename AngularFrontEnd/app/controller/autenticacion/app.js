var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

app.constant('CONFIG', {
    APIURL: "http://pdp6:85/backEnd/model/",
    email: "ftapi",
    password: "123",
    HOMEPATH: "#/home"
});

app.controller("NavCtrl",function($scope, $http, $rootScope, CONFIG, sessionService){    
    var urlmenu = CONFIG.APIURL + 'administracion/opciones.php';  
    $http.get(urlmenu + '/menu/' + sessionService.get('IDUSUARIO')).then(function (results) {        
        $scope.categories = results.data;
		console.log('menu generado');
    });
});

app.config(['$routeProvider',
  function ($routeProvider) {
        $default = '../autenticacion/index.html';       
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
			.when('/:name', {
                    templateUrl: 'partials/blank.html',
                    controller: PagesController
                }) 
            .otherwise({              
                templateUrl: $default
            });
  }])
    .run(function ($rootScope, $location, Data, sessionService) {       
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            $rootScope.usuario = sessionService.get('IDUSUARIO');
            if ($rootScope.usuario) {
                $rootScope.nombre = sessionService.get('USUARIO');
            } else {
                $location.path("");
            }           
        });
    });
	
function PagesController($scope, $http, $route, $routeParams, $compile) {
	
	var cadena = $routeParams.name;
	
	var res = cadena.replace(/\|/g, "/"); 
	
	console.log(cadena);
	console.log(res);
	var direccion = "../"+res;
  
    $route.current.templateUrl = direccion;

    $http.get($route.current.templateUrl).then(function(msg) {
        $('#ng-view').html($compile(msg.data)($scope));
    });	
}

PagesController.$inject = ['$scope', '$http', '$route', '$routeParams', '$compile'];