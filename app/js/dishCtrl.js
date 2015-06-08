// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

  // TODO in Lab 5: you need to get the dish according to the routing parameter
   	$scope.dish = Dinner.Dish.get({id:$routeParams.dishId})
    $scope.numberOfGuests = Dinner.numberOfGuests;

    
   /* $scope.getNumberOfGuests = function() {
    	return Dinner.getNumberOfGuests();
  	}*/

  	$scope.round = function(num){
  		return Math.round(num);
  	}

  	$scope.getDishPrice = function(dish){
  		return Dinner.getDishPrice(dish);
  	}

  	$scope.confirm = function(dish){
  		Dinner.addDishToMenu(dish);
      Dinner.setTotalMenuPrice();
  	}

    
  // Check the app.js to figure out what is the paramName in this case
  
});