app.factory("servicesUsuarioRol", ['$http','$resource','CONFIG', function($http,$resource,CONFIG) {
    var obj = {};
    var url = CONFIG.APIURL1;
    var server = CONFIG.TYPE;
    if(server=='dream') {  
        return $resource(url + '_bp_usuarios_roles/:id/?app_name=24-7-master&fields=*', {}, { update: { method: 'PUT' }, query: {
            method: 'GET',
            isArray: false
        } });
    }
    else{
        obj.getUsuariosRoles = function(){
            return $http.get(url + 'administracion/usuariosRoles.php/listaUsuariosRoles');
        };
        //********obteniendo roles
        obj.comboRoles = function(){
            return $http.get(url + 'administracion/usuariosRoles.php/listaRoles');
        }; 
        //********obteniendo personas
        obj.comboUsuarios = function(){
            return $http.get(url + 'administracion/usuariosRoles.php/listaUsuarios');
        }; 
        obj.insertUsuarioRol = function (usuarioRol) {
            //console.log(usuarioRol);
          return $http.post(url + 'administracion/usuariosRoles.php/nuevoUsuarioRol', usuarioRol).then(function (results) {
            return results;
          });
        };
        return obj;   
    }  
}]);

app.controller('UsuariosRolesController', function ($scope,servicesUsuarioRol, CONFIG) {
    var server = CONFIG.TYPE;
    var url = CONFIG.APIURL1;
    if(server=='dream') {
        $scope.action="Add";
        $scope.usuariosRoles = servicesUsuarioRol.get();
        //console.log($scope.Todos);
        $scope.creds = {
            "body": {
                "email": 'ftapia@lapaz.bo',
                "password": '123'
            }
        }
        // Login function
        $scope.loginFunc = function() {
            DreamFactory.api.user.login($scope.creds,
                function(result) {
                    console.log(result)
                },
                function(error) {
                }
            );
        } 
        $scope.addItem = function(){
            $scope.todo.complete = true;
            servicesUsuarioRol.save($scope.todo, function(data){
                $scope.usuariosRoles.record.push(data);
                $scope.todo={};
            });
        }
        $scope.updateItem = function () {
            var todo = this.todo;

            if(this.todo.complete === false){
                this.todo.complete = true;
            }else{
                this.todo.complete = false;
            }
            $('#item_' + todo.id).toggleClass('strike');
            servicesUsuarioRol.update({id:todo.id}, todo, function () {
                updateByAttr($scope.usuariosRoles.record, 'id', todo.id, todo);

            });
        };
        $scope.deleteItem = function(){

            var id = this.todo.id;
            servicesUsuarioRol.delete({ id:id }, function () {
                $("#row_" + id).fadeOut();
            });
        }
        var updateByAttr = function(arr, attr1, value1, newRecord){
            if(!arr){
                return false;
            }
            var i = arr.length;
            while(i--){
                if(arr[i] && arr[i][attr1] && (arguments.length > 2 && arr[i][attr1] === value1 )){
                    arr[i] = newRecord;
                }
            }
            return arr;
        };
    } 
    else {
        servicesUsuarioRol.getUsuariosRoles().then(function(data){
            $scope.usuariosRoles = data.data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 5; //max no of items to display in a page
            $scope.filteredItems = $scope.usuariosRoles.length; //Initially for no filter
            $scope.totalItems = $scope.usuariosRoles.length;
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
        servicesUsuarioRol.comboRoles().then(function(data){
            $scope.roles = data.data;
        });
        servicesUsuarioRol.comboUsuarios().then(function(data){
            $scope.usuarios = data.data;
        });
        $scope.GuardarUsuarioRol = function(usuariosRoles){
            console.log(usuariosRoles);
            servicesUsuarioRol.insertUsuarioRol(usuariosRoles);
        }
    }

        
});