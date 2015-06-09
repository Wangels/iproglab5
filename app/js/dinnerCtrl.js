// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.menu = Dinner.getFullMenu()
//  $scope.pending = Dinner.pendingPrice;

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
    //Dinner.setTotalMenuPrice();
  }

  $scope.getNumberOfGuests = Dinner.getNumberOfGuests();

  $scope.getDishPrice = function(dish){
  	return Dinner.getDishPrice(dish);
  }

  $scope.totalMenuPrice = function(){
    return Dinner.getTotalMenuPrice();
  }

  $scope.remove = function(id){
    Dinner.removeDishFromMenu(id);
    //Dinner.setTotalMenuPrice();
  }

  $scope.inDish = function(){
    if(Dinner.currentDish){
      return true;
    }
    else{
      return false;
    }
  }




  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});