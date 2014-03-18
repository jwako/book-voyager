var bookControllers = angular.module('bookControllers', ['infinite-scroll']);

bookControllers.controller('BookCtrl', function($scope, $http, Book) {
	$scope.page = 1;
	$scope.items = [];
  $scope.category = "";
  $scope.price = "";
  $scope.loadMore = function() {
  	$scope.busy = true;
    if ($scope.page <= 10) {
      Book.getBooks($scope.page, $scope.category, $scope.price).then(function(book) {
        $scope.busy = false;
        for (var i = 0; i < book.data.length; i++) {
          $scope.items.push(book.data[i]);
        }
      });
      $scope.page += 1;
    } else {
      $("#donetext").append("<p class='text-info text-center'>You're reached the end of items.</p>");
    }
  }
});

bookControllers.controller('CategoryCtrl', function($scope, $http) {
  
  loadData = function () {
    $http.get('/v1/categories').success(function(data) {
      $scope.tree = data;
    });
  };

  loadData();

  $scope.refresh = function(category) {
    // category.active = "active";
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

bookControllers.controller('ConditionCtrl', function($scope, $http, Book) {
  $scope.retrieveByPrice = function(priceRange) {
    var scope = angular.element('#books').scope();
    scope.page = 1 ;
    scope.price = priceRange;
    scope.items = [];
    scope.loadMore();
  }

});
	