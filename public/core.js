var polOffers = angular.module('polOffers', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all offers and show them
	$http.get('/api/offers')
		.success(function(data) {
			$scope.offersMonth = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	

}