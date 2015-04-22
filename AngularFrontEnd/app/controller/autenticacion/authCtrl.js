app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        var urlAutenticacion = 'http://pdp6:85/backEnd/model/administracion/usuarios.php';
        $http.post(urlAutenticacion + '/autenticacion', {customer: customer} ).then(function (results) {            
            //+ $scope.login.usuario + "/" + $scope.login.clave            
            if (results.data.length > 0) {
                sessionService.set('IDUSUARIO', results.data[0].usr_id);
                sessionService.set('USUARIO', results.data[0].usr_usuario);
                $rootScope.nombre = sessionService.get('USUARIO');
                $location.path('dashboard');
            } else {
                $scope.msg = "Error en usuario y/o contraseña";
                $location.path('');
            }
            //$scope.autenticacion = results.data;
            //Data.toast(results);
        });        
    };
    $scope.signup = {usuario:'',clave:'',name:'',phone:'',address:''};
    //$scope.signup = function(){ alert("OK");};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function () {
        /*Data.get('logout').then(function (results) {
            Data.toast(results);
            
            $location.path('');
        });*/
        sessionService.destroy('USER');
        sessionService.destroy('IDUSUARIO');
        sessionService.destroy('USUARIO');
        $location.path('');
    }
});