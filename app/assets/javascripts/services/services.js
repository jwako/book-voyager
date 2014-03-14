var bookServices = angular.module('bookServices', []);

bookServices.factory('Book', function($http) {
	var bookService = {
		getBooks : function(page) {
			var response = $http.get('/v1/books/' + page + '.json').success(function(data) {
				return data;
			});
			return response;
		}
	};
	return bookService;
});

