app.factory("servicesAccesos", ['$http','$resource','CONFIG', function($http,$resource,CONFIG) {
    //return $resource('http://zeus/rest/wsPosgres/_bp_personas/:id/?app_name=24-7-master&fields=*', {}, { update: { method: 'PUT' }, query: {
        var obj = {};
        var url = CONFIG.APIURL;
        var server = CONFIG.TYPE;
        if(server=='dream') {  
            return $resource(url + '_bp_accesos/:id/?app_name=24-7-master&fields=*', {}, { update: { method: 'PUT' }, query: {
                method: 'GET',
                isArray: false
            } }); 
        }
        else{
            obj.getAccesos = function(){
                //alert('slim');
                return $http.get(url + 'administracion/accesos.php/listaaccesos');
            };
            //return $http.get('http://pdp6:85/backEnd/model/administracion/personas.php/listaPersonas');
            return obj; 
        }
}]);
app.controller('accesosControler', function ($scope,servicesAccesos, CONFIG) {
    var server = CONFIG.TYPE;
    var url = CONFIG.APIURL;
    //alert(server);
    $scope.action="Add";
    if(server=='dream') {
        $scope.acceso = servicesAccesos.get(url);
         $scope.creds = {
            "body": {
                "email": 'ftapia@lapaz.bo',
                "password": '123'
            }
        }
        //console.log($scope.Todos);
        /********* Adicionar ************/
        $scope.opc_id='1';
        $scope.addItem = function(acceso){
        console.log(opcion);
        $scope.acceso.complete = true;
        servicesAccesos.save($scope.acceso, function(data){
            $scope.Todos.record.push(data);
            $scope.acceso={};
         });
        }
          // Login function
        $scope.loginFunc = function() {
          DreamFactory.api.user.login($scope.creds,
            function(result) {
              console.log(result)
            },
            function(error) {
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
              servicesAccesos.update({id:todo.id}, todo, function () {
                  updateByAttr($scope.Todos.record, 'id', todo.id, todo);

              });
          };
          $scope.deleteItem = function(){

              var id = this.todo.id;
              Todo.delete({ id:id }, function () {
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
        console.log($scope.Todos);
        servicesAccesos.getAccesos().then(function(data){
            $scope.acceso = data.data;
        });

    }
});


