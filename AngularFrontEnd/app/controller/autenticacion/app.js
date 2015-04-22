var app = angular.module('myApp', ['ngResource','ngRoute', 'ngAnimate', 'toaster']);

app.constant('CONFIG', {
    APIURL: "http://pdp6:85/backEnd/model/",
    TYPE: "slim",
    HOMEPATH: "#/home"
});
app.controller("NavCtrl",function($scope, $http, $rootScope, CONFIG, sessionService){ 
    var urlmenu = CONFIG.APIURL + 'administracion/opciones.php';
    //alert($rootScope.usuario);
    //alert(sessionService.get('IDUSUARIO'));
    $http.post(urlmenu + '/menu', { id_us : sessionService.get('IDUSUARIO')}).then(function (results) { 
        $scope.categories = results.data;
    });
});



app.config(['$routeProvider',
  function ($routeProvider) {
        $default = '../autenticacion/index.html';
        //$ruta = '../administracion/usuarios.html';        
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
                //redirectTo: '/login'
                templateUrl: $default
            });
  }])
    .run(function ($rootScope, $location, Data, sessionService,CONFIG) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            $rootScope.usuario = sessionService.get('IDUSUARIO');
            if ($rootScope.usuario) {
                $rootScope.nombre = sessionService.get('USUARIO');
            } else {
                if(next.originalPath != "/signup"){
                    $location.path("");
                }                
            }
            /*Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {

                    } else {
                        //$location.path("/login");
                    }
                }
            });*/
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