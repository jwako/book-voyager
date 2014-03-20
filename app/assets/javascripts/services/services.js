var bookServices = angular.module('bookServices', []);

bookServices.factory('Book', function($http) {
	var bookService = {
		getBooks : function(page, category, price, stock, sort) {
			var response = $http.get('/v1/books/' + page + '.json?bn=' + category + '&pr=' + price + '&av=' + stock + "&st=" + sort
				).success(function(data) {
					return data;
			});
			return response;
		}
	};
	return bookService;
});

