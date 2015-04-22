app.factory("servicesPersona", ['$http','$resource','CONFIG', function($http,$resource,CONFIG) {
    //return $resource('http://zeus/rest/wsPosgres/_bp_personas/:id/?app_name=24-7-master&fields=*', {}, { update: { method: 'PUT' }, query: {
        
        var obj = {};
        var url = CONFIG.APIURL1;
        var server = CONFIG.TYPE;
        if(server=='dream') {  
            
            //obj.getPersonas = function(){
                return $resource(url + '_bp_personas/:id/?app_name=24-7-master&fields=*', {}, { update: { method: 'PUT' }, query: {
                    method: 'GET',
                    isArray: false
                } }); 
            //};
        }
        else{
            obj.getPersonas = function(){
                //alert('slim');
                return $http.get(url + 'administracion/personas.php/listaPersonas');
            };
            //return $http.get('http://pdp6:85/backEnd/model/administracion/personas.php/listaPersonas');
            return obj; 
        }
}]);
app.controller('PersonasController', function ($scope, servicesPersona, CONFIG) {
    var server = CONFIG.TYPE;
    var url = CONFIG.APIURL1;
    if(server=='dream') {
        $scope.action="Add";
        $scope.personas = servicesPersona.get();
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
            servicesPersona.save($scope.todo, function(data){
                $scope.personas.record.push(data);
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
            servicesPersona.update({id:todo.id}, todo, function () {
                updateByAttr($scope.personas.record, 'id', todo.id, todo);

            });
        };
        $scope.deleteItem = function(){

            var id = this.todo.id;
            servicesPersona.delete({ id:id }, function () {
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
        servicesPersona.getPersonas().then(function(data){
            $scope.personas = data.data;
        });
    }
});


