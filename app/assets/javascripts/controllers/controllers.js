var bookControllers = angular.module('bookControllers', ['infinite-scroll']);

bookControllers.controller('BookCtrl', function($scope, $http, Book) {
	$scope.page = 1;
	$scope.items = [];
  $scope.category = "";

  $scope.loadMore = function() {
  	$scope.busy = true;
    Book.getBooks($scope.page, $scope.category).then(function(book) {
      $scope.busy = false;
      for (var i = 0; i < book.data.length; i++) {
        $scope.items.push(book.data[i]);
      }
    });
  	$scope.page += 1;
  }

});

bookControllers.controller('CategoryCtrl', function($scope, $http) {
  $http.get('/v1/categories').success(function(data) {
    $scope.tree = data;
  });

  $scope.refresh = function(category) {
    getChildCategories(category);
    getBooks(category.node_id);
    showCategory(category);
  }

  getChildCategories = function(category) {
    $http.get('/v1/categories?bn=' + category.node_id).success(function(data) {
      category.nodes = data;
    });
  }

  getBooks = function(category) {
    var scope = angular.element('#books').scope();
    scope.page = 1 ;
    scope.category = category;
    scope.items = [];
    scope.loadMore();
  }

  showCategory = function(category) {
    category.show_flag = true;
  }

});
	