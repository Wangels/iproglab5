// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.totalMenuPrice = Dinner.totalMenuPrice;
  $scope.menu = Dinner.getFullMenu()
  $scope.pending = Dinner.pendingPrice;

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
    Dinner.setTotalMenuPrice();
  }

  $scope.getNumberOfGuests = Dinner.getNumberOfGuests();

  $scope.getDishPrice = function(dish){
  	return Dinner.getDishPrice(dish);
  }

  $scope.remove = function(id){
    Dinner.removeDishFromMenu(id);
    Dinner.setTotalMenuPrice();
  }




  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});