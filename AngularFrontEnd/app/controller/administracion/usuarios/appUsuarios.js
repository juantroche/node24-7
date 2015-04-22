app.factory("servicesUsuario", ['$http','$resource','CONFIG', function($http,$resource,CONFIG) {
    var obj = {};
    var url = CONFIG.APIURL1;
    var server = CONFIG.TYPE;
    if(server=='dream') {  
        return $resource(url + '_bp_usuarios/:id/?app_name=24-7-master&fields=*', {}, { update: { method: 'PUT' }, query: {
            method: 'GET',
            isArray: false
        } });
    }
    else{
        obj.getUsuarios = function(){
            return $http.get(url + 'administracion/usuarios.php/listaUsuarios');
        };
        //********obteniendo personas
        obj.comboPersonas = function(){
            return $http.get(url + 'administracion/usuarios.php/listaPersonas');
        }; 
        //*******registro Usuario
        obj.insertUsuario = function (usuario) {
          return $http.post(url + 'administracion/usuarios.php/nuevoUsuario', usuario).then(function (results) {
            return results;
          });
        };
        return obj;   
    } 
}]);

app.controller('UsuariosController', function ($scope,servicesUsuario, CONFIG) {
    var server = CONFIG.TYPE;
    var url = CONFIG.APIURL1;
    if(server=='dream') {
        $scope.action="Add";
        $scope.usuarios = servicesUsuario.get();
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
            servicesUsuario.save($scope.todo, function(data){
                $scope.usuarios.record.push(data);
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
            servicesUsuario.update({id:todo.id}, todo, function () {
                updateByAttr($scope.usuarios.record, 'id', todo.id, todo);

            });
        };
        $scope.deleteItem = function(){

            var id = this.todo.id;
            servicesUsuario.delete({ id:id }, function () {
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
        servicesUsuario.getUsuarios().then(function(data){
            $scope.usuarios = data.data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 5; //max no of items to display in a page
            $scope.filteredItems = $scope.usuarios.length; //Initially for no filter
            $scope.totalItems = $scope.usuarios.length;
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
        servicesUsuario.comboPersonas().then(function(data){
            $scope.personas = data.data;
        });
        $scope.GuardarUsuario = function(usuario){
            servicesUsuario.insertUsuario(usuario);
            servicesUsuario.getUsuarios().then(function(data){
                $scope.usuarios = data.data;
                $scope.currentPage = 1; //current page
                $scope.entryLimit = 5; //max no of items to display in a page
                $scope.filteredItems = $scope.usuarios.length; //Initially for no filter
                $scope.totalItems = $scope.usuarios.length;
            });
        }
    }

});
