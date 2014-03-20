var bookControllers = angular.module('bookControllers', ['infinite-scroll']);

bookControllers.controller('BookCtrl', function($scope, $http, Book) {
	$scope.page = 1;
	$scope.items = [];
  $scope.category = "";
  $scope.price = "";
  $scope.stock = "";
  $scope.sort = "";
  $scope.loadMore = function() {
  	$scope.busy = true;
    if ($scope.page <= 10) {
      Book.getBooks($scope.page, $scope.category, $scope.price, $scope.stock, $scope.sort).then(function(book) {
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
  var selected_category;

  loadData = function () {
    $http.get('/v1/categories').success(function(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].root_node_id = data[i].node_id;
      }
      $scope.tree = data;
    });
  };

  loadData();

  $scope.refresh = function(category) {
    getChildCategories(category);
    getBooks(category.node_id);
    showCategory(category);
    hideCategory(selected_category, category);
    selected_category = category;
  }

  getChildCategories = function(category) {
    $http.get('/v1/categories?bn=' + category.node_id).success(function(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].root_node_id = category.root_node_id;
      }
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
    category.active = "active";
  }

  hideCategory = function(pre_category, category) {
    if (pre_category != undefined && pre_category.root_node_id != category.root_node_id) {
      for (var i = 0; i < $scope.tree.length; i++) {
        if ( $scope.tree[i].root_node_id == pre_category.root_node_id ) {
          $scope.tree[i].show_flag = false;
          $scope.tree[i].active = "";
          return;
        }
      }
    }
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

  $scope.retrieveByStock = function() {
    var scope = angular.element('#books').scope();
    scope.page = 1 ;
    scope.stock = "Available";
    scope.items = [];
    scope.loadMore();
  }
});

bookControllers.controller('SortCtrl', function($scope, $http, Book) {
  $scope.sorts = [ 
    {val: 'salesrank', text: '人気順'}, 
    {val: 'pricerank', text: '価格安い順'}, 
    {val: 'inverse-pricerank', text: '価格高い順'}, 
    {val: 'daterank', text: '発売日順'}, 
    {val: 'titlerank', text: 'タイトル順'}, 
    {val: '-titlerank', text: 'タイトル逆順'}
  ];
  $scope.item = {type : $scope.sorts[0].val};
  $scope.sort = function() {
    var scope = angular.element('#books').scope();
    scope.page = 1 ;
    scope.items = [];
    scope.sort = $scope.item.type;
    scope.loadMore();
  }
});
