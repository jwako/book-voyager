var bookServices = angular.module('bookServices', []);

bookServices.factory('Book', function($http) {
	var bookService = {
		getBooks : function(page, category, price) {
			var response = $http.get('/v1/books/' + page + '.json?bn=' + category + '&pr=' + price).success(function(data) {
				return data;
			});
			return response;
		}
	};
	return bookService;
});

