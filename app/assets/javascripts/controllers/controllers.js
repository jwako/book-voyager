var bookControllers = angular.module('bookControllers', ['infinite-scroll']);

bookControllers.controller('BookCtrl', function($scope, $http) {
	$scope.page = 1;
	$scope.items = [];

  $scope.loadMore = function() {
  	$scope.busy = true;
  	$http.get('/v1/books/' + $scope.page + '.json').success(function(data) {
  		for (var i = 0; i < data.length; i++) {
        $scope.items.push(data[i]);
      }
    	$scope.busy = false;
  	});
  	$scope.page += 1;
  }

});

bookControllers.controller('CategoryCtrl', function($scope, $http) { 
  $http.get('/v1/categories').success(function(data) {
    $scope.tree = data;
  });

  $scope.getChildCategories = function(category) {
    $http.get('/v1/categories?bn=' + category.node_id).success(function(data) {
      category.nodes = data;
    });
  }
});
	