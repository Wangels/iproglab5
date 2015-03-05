// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var api_key = 'dvxSUK163SzdpwzA1C825d98lxc5YmU1'
  var numberOfGuests = 2
  var menu = []
  var pendingPrice = 0
  var searchType = undefined
  var searchFilter = undefined
  var currentDish = undefined


  this.setNumberOfGuests = function(num) {
    if(num>0){
      numberOfGuests = num
    }
    else{
      numberOfGuests = 0
    }
  }

  this.getNumberOfGuests = function() {
    return numberOfGuests;
  }

  this.getSearchFilter = function(){
    return searchFilter
  }

  this.setSearchFilter = function(filter){
    searchFilter = filter
  }
  

  this.setPending = function(dishObject){
    if(!dishObject){
      pendingPrice = 0
    }
    else{
      
      pendingPrice = this.getDishPrice(dishObject)
    }
  }

  this.getPending = function(){
    return pendingPrice
  }


  this.getCurrentDish = function(){
    return currentDish
  }

  this.setCurrentDish = function(dishObject){
    currentDish = dishObject
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(dishType) {


    if(dishType == "starter"){
      return this.getDish(menu.starter)
    }
    else if(dishType == "main"){
      return this.getDish(menu.main)
    }
    else if(dishType == "dessert"){
      return this.getDish(menu.dessert)
    }
    
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {

    return menu
  }

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    var ingredientList = []
    var dishList = this.getFullMenu()

    for(key in dishList){
      //ingredientList = ingredientList.concat(dishes[key].ingredients)
      for(ingredientKey in dishList[key].Ingredients){
        ingredientList.push(dishList[key].Ingredients[ingredientKey])
      }
    }

    return ingredientList
  }

  //returns the price for a single dish
  this.getDishPrice = function(dishObject){
    var ingredientList = dishObject.Ingredients

    var totalPrice = 0

    for(key in ingredientList){
      totalPrice = totalPrice + ingredientList[key].MetricQuantity
    }

    totalPrice = totalPrice*numberOfGuests
    return Math.round(totalPrice)


  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {

    var totalPrice = 0
    for(var i=0;i<menu.length;i++){
      totalPrice = totalPrice + this.getDishPrice(menu[i])
    }

    totalPrice = totalPrice + pendingPrice

    return totalPrice
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(dishObject) {
    var notInMenu = true

    for(var i=0; i<menu.length;i++){
      if(menu[i].RecipeID === dishObject.RecipeID){
        notInMenu = false
      }
    }
    if(notInMenu){
        menu.push(dishObject)
      }

  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    for(key in menu){
      if(menu[key].RecipeID === id){
        menu.splice(key, 1)
      }
    }

  }

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:24,api_key:api_key});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:api_key}); 

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});