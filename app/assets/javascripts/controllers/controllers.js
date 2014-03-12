var bookvoyagerApp = angular.module('bookvoyagerApp', ['infinite-scroll']);

bookvoyagerApp.controller('BookCtrl', function($scope, $http) {
	$scope.page = 1;
	$scope.items = []

  $scope.loadMore = function() {
  	$scope.busy = true;
  	$http.get('/v1/books/' + $scope.page + '.json').success(function(data) {
  		for (var i = 0; i < data.length; i++) {
        $scope.items.push(data[i]);
      }
    	$scope.busy = false;
  	});
  	$scope.page += 1;
  };

});

	