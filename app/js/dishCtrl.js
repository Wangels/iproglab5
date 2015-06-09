// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

   	$scope.dish = Dinner.Dish.get({id:$routeParams.dishId})
    Dinner.setCurrentDish($scope.dish);
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
      Dinner.setCurrentDish(undefined)
      //Dinner.setTotalMenuPrice();
  	}

    $scope.back = function(){
      Dinner.setCurrentDish(undefined)
    }


  
});