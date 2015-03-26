dinnerPlannerApp.controller('PrepCtrl', function ($scope,Dinner) {

  	$scope.menu = Dinner.getFullMenu()

})