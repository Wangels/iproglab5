dinnerPlannerApp.controller('ConfirmCtrl', function ($scope,Dinner) {

  	$scope.getTotalMenuPrice = Dinner.getTotalMenuPrice();
  	$scope.menu = Dinner.getFullMenu()

  	$scope.getDishPrice = function(dish){
  		return Dinner.getDishPrice(dish);
  	}



});


dinnerPlannerApp.controller('TopCtrl', function ($scope,Dinner) {

	$scope.numberOfGuests = Dinner.getNumberOfGuests();

})