'use strict';

// Articles controller
var app= angular.module('pagina1').controller('Pagina1Controller', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;
		
		/*
		$scope.create = function() {
			// Create new Article object
			console.log(111);
		};
		
		
		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var article = new Articles({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		// Update existing Article
		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Articles
		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
		
		*/
	}
]);
app.factory("pagina1", ['$http', function($http) {
var serviceBase = 'http://pdp6:85/backEnd/model/administracion/grupos.php/'
    var obj = {};
    obj.getCustomers = function(){
        return $http.get(serviceBase + 'listagrupo');       
    };
    /****** insertar ********/
    obj.insertCustomer = function (grupos) {
      return $http.post(serviceBase + 'nuevoGrupos', grupos).then(function (results) {
        return results;
      });
    };

     return obj; 

}]);
app.controller('gruposController', function ($scope,pagina1) {
    pagina1.getCustomers().then(function(data){
        $scope.customers = data.data;
    });
    $scope.GuardarGrupos = function(grupos){
      pagina1.insertCustomer(grupos);
    }


});