// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  var api_key = 'dvxSUK163SzdpwzA1C825d98lxc5YmU1'
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:24,api_key:api_key});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:api_key}); 
  this.pendingPrice = 0
  var searchType = undefined
  var searchFilter = undefined
  var currentDish = undefined
  this.totalMenuPrice = 0;


  this.getMenuList = function(){
    var IDlist = $cookieStore.get("menu")
    var menu = []
    if(IDlist[0] != null){
      for (var i=0; i<IDlist.length; i++){
        menu.push(this.Dish.get({id:IDlist[i]}))
      }
    }
    return menu
  }


  this.cookieGuests = function(){
    var guests = $cookieStore.get("numberOfGuests")
    if(guests){
      return guests
    }
    return 2
  }


  var menu = this.getMenuList()
  this.numberOfGuests = this.cookieGuests()

   //returns the price for a single dish
  this.getDishPrice = function(dishObject){
    var ingredientList = dishObject.Ingredients
    var totalPrice = 0

    for(key in ingredientList){
      totalPrice = totalPrice + ingredientList[key].MetricQuantity
    }

    totalPrice = totalPrice*this.numberOfGuests
    
    return Math.round(totalPrice)


  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.setTotalMenuPrice = function() {
    var totalPrice = 0
    for(var i=0;i<menu.length;i++){
      totalPrice = totalPrice + this.getDishPrice(menu[i])
    }

    totalPrice = totalPrice //+ this.pendingPrice
    this.totalMenuPrice = totalPrice
    console.log(this.totalMenuPrice)
  }

  //Give totalmenuprice a start value
  this.setTotalMenuPrice()


  this.setNumberOfGuests = function(num) {
    if(num>0){
      this.numberOfGuests = num
    }
    else{
      this.numberOfGuests = 0
    }

    $cookieStore.put("numberOfGuests", this.numberOfGuests)
  }

  this.getNumberOfGuests = function() {
    return this.numberOfGuests;
  }

  this.getSearchFilter = function(){
    return searchFilter
  }

  this.setSearchFilter = function(filter){
    searchFilter = filter
  }
  

  /*this.setPending = function(dishObject){
    if(!dishObject){
      console.log("in the wrong place")
      this.pendingPrice = 0
    }
    else{

      this.pendingPrice = this.getDishPrice(dishObject)
      console.log("in the right place " + this.pendingPrice)
    }
  }*/

  this.setPending = function(price){
    this.pendingPrice = price;
    console.log("Set pending", price)
  }

  this.getPending = function(){
    return this.pendingPrice
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

 


//Helpfunction for cookies, converts dish-object-list to ID-list
  this.menuIDs = function(){
    var menuIDs = []
    for (var i=0; i<menu.length; i++){
      menuIDs.push(menu[i].RecipeID)
    }
    return menuIDs
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
        var IDmenu = this.menuIDs()
        $cookieStore.put("menu", IDmenu)
      }

  }



  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    for(key in menu){
      if(menu[key].RecipeID === id){
        menu.splice(key, 1)
        $cookieStore.put("menu", this.menuIDs())
      }
    }

  }



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