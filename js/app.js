/*
 *  app.js (Angular.js front-end processing)
 *  By Jonathan Ballands, Sloane Neidig, and Brad Retterer
 *  
 *  (C)2014 All Rights Reserved.
 */

var shopMaster = angular.module("shopMaster", ["ngRoute", "ui.bootstrap"]);

/* 
 * -------
 * Routing
 * -------
 */

shopMaster.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/landing.html",
        controller: "LandingCtrl"
    }),
    
    $routeProvider.when("/create", {
        templateUrl: "templates/create.html",
        controller: "CreateCtrl"
    });
});

/*
 *  ----------
 *  Directives
 *  ----------
 */

// Here, I'm interacting with the jQuery UI draggable widget API
// http://api.jqueryui.com/draggable/
shopMaster.directive("dir-sortable", function($compile) {
    return {
        restrict: "A",
    
        link:function(scope, element, attrs){
            
            element.sortable({

                deactivate: function(event, ui) {
                    console.log("Deactivated");
                    
                    var from = angular.element(ui.item).scope().$index;
                    var to = el.children().index(ui.item);
        
                    if(to >= 0){
                        scope.$apply(function() {
                            if(from >= 0){
                                scope.$emit("listReorderedEvent", {from: from, to: to});
                            }
                        });
                    }
                }
                
            });
            
            element.disableSelection();
        }
    };
});    

/* 
 * -----------
 * Controllers
 * -----------
 */

shopMaster.controller("LandingCtrl", function($scope, $location, $http) {
    
    // Verify email
    $scope.verifyEmail = function() {
        
        // DEBUG
        $location.path("/create");
        
        /*var emailAddress = $scope.emailAddress;
        
        // Fire AJAX request
        $http({method: "GET", 
               url: "http://shopmasterbackend-env-pjjgskpgzv.elasticbeanstalk.com/emailVerify/" + emailAddress}).
            
            success(function(data, status, headers, config) {
                // Handle success
                $("#sm-loading-landing").css({"visibility": "invisible"});
                
                // TODO: Check result to see if it was true or false
                
                // Route to create
                $location.path("templates/create.html");
            }).
            error(function(data, status, headers, config) {
                // Handle error
                $("#sm-loading-landing").css({"visibility": "invisible"});
                
                // TODO: Show that there was an error...
            });
        
        // Show loading animation
        $("#sm-loading-landing").css({"visibility": "visible"});*/
    };

});

shopMaster.controller("CreateCtrl", function($scope, $location, $http) {
    
    $scope.items = [];
    
    $scope.categories = [
        "Biscuits",
        "Cheese",
        "Ice Cream",
        "Waffles",
        "Frozen Fruit",
        "Whipped Topping",
        "Frozen Novelties",
        "Frozen Breakfast",
        "Orange Juice",
        "Milk",
        "Cream",
        "Frozen Meals (Single)",
        "Frozen Meals (Lite)",
        "Frozen Meals (Family)",
        "Frozen Meals (Vegetarian)",
        "Bread (Frozen)",
        "Vegatables (Frozen)",
        "International Frozen Foods",
        "Chicken (Frozen)",
        "Beef (Frozen)",
        "Seafood (Frozen)",
        "Potatoes (Frozen)",
        "Frozen Snacks",
        "Pizza",
        "Pizza (Single)",
        "Car Accessories",
        "Air Filters",
        "Lightbulbs",
        "Office Supplies",
        "Pet Treats",
        "Litter",
        "Cat Food (Wet)",
        "Cat Food (Dry)",
        "Dog Food (Wet)",
        "Dog Food (Dry)",
        "Bird Food",
        "Small Animal Food",
        "Charcoal",
        "Toilet Paper",
        "Party Supplies",
        "Food Storage",
        "Storage Bags",
        "Trash Bags",
        "Paper Towels",
        "Cleaning Supplies",
        "Swiffers",
        "Mops",
        "Sponges",
        "Dish Care",
        "Bleach",
        "Fabric Softener",
        "Detergent",
        "Air Freshener",
        "Insect Repellent",
        "Soda/Soft Drinks",
        "Bread",
        "Energy Drinks",
        "Water",
        "Buns/Bagels",
        "Snack Cakes",
        "Juices",
        "Sports Drinks",
        "Family Snacks",
        "Jam/Jelly",
        "Peanut Butter",
        "Pancake Mix",
        "Syrup",
        "Breakfast Bars",
        "Cereal",
        "Crackers",
        "Cookies",
        "Candy",
        "Potato Chips",
        "Popcorn",
        "Baby Toys",
        "Baby Wipes",
        "Diapers",
        "Coffee",
        "Coffee Filters",
        "Tea",
        "Hot Cocca",
        "Baby Food/Formula",
        "Condiments",
        "Pickles",
        "Spices",
        "Flour",
        "Disposable Baking Ware",
        "Vinegar",
        "Oil",
        "Cake Mix",
        "Gelatin/Jello (Dry)",
        "Icing",
        "Sweet Toppings",
        "Baking Soda",
        "Sugar",
        "Salad Dressing",
        "European Foods",
        "Mediterranean Foods",
        "Asian Foods",
        "Latin American Foods",
        "Pasta (Canned)",
        "Pasta (Dry)",
        "Pasta Sauce",
        "Tuna",
        "Soup (Canned)",
        "Soup (Dry)",
        "Rice",
        "Beans",
        "Potatoes (Instant)",
        "Gravy",
        "Pizza Crust",
        "Vegatables (Canned)",
        "Tomatoes (Canned)",
        "Fruit (Canned)",
        "Mac n' Cheese",
        "Seasonal Items",
        "Kitchen Ware",
        "Greeting Cards",
        "Coffee Makers",
        "Plates (Glass)",
        "Crock Pots",
        "Cups (Glass)",
        "Jugs (Glass)",
        "Toasters",
        "Utensils (Metal)",
        "Rags/Towels",
        "Food Processors",
        "Blenders",
        "Pyrex (Glass Bakeware)",
        "Books",
        "Sunglasses",
        "Pots and Pans",
        "Magazines",
        "Potato Chips (Organic)",
        "Nuts (Organic)",
        "Energy Bars (Organic)",
        "Drinks (Organic)",
        "Soda/Soft Drinks (Organic)",
        "Coffee (Organic)",
        "Soup (Organic)",
        "Sauces (Organic)",
        "Juices (Organic)",
        "Beauty (Natural)",
        "Wheat/Gluten-Free Foods",
        "Cookies (Organic)",
        "Crackers (Organic)",
        "Chocolate (Organic)",
        "Cereal (Organic)",
        "Frozen Foods (Organic)",
        "Milk (Organic)",
        "Beer",
        "Fruit",
        "Apples",
        "Potatoes",
        "Onions",
        "Produce",
        "Salad Dressing (Cold)",
        "Cake",
        "Delicatessen",
        "Hot Meals",
        "Wine",
        "Cheese (Fancy)",
        "Spreads (Humus)",
        "Sushi",
        "Beef",
        "Chicken",
        "Meat (Fresh)",
        "Seafood (Fresh)",
        "Meat (Organic)",
        "Prepared Meats",
        "Sausage",
        "Lunch Meats",
        "Bacon",
        "Eggs",
        "Butter",
        "Yogurt",
        "Gelatin/Jello (Cold)",
        "Sour Cream",
        "Cotton Balls",
        "Nail Care",
        "Cosmetics",
        "Acne",
        "Face Care",
        "Sunscreen",
        "Hair Care",
        "Bubble Bath",
        "Lotion",
        "Soap",
        "Hand Sanitizer",
        "Shampoo",
        "Incontinence",
        "Adult Nutrition",
        "Pain Relief",
        "Fiber",
        "Laxitives",
        "Heartburn Medication",
        "First Aid",
        "Heat Wraps",
        "Eye Care",
        "Foot Care",
        "Travel-Sized Items",
        "Mouthwash",
        "Toothpaste",
        "Toothbrushes",
        "Styling Tools",
        "Hair Brushes",
        "Deodorant",
        "Hair Color",
        "Pharmacy",
        "Vitamins",
        "Family Planning",
        "Feminine Items",
        "Socks",
        "Protein Powder",
        "Shaving Cream",
        "Razors",
        "Cold/Flu Medication",
        "Lip Balm"
    ];
    
    $scope.addItem = function(items) {
        
        var item = $scope.tbaItem;
        var cat = $scope.tbaCategory;
        
        $scope.items.push({name: item, category: cat});
        
        $scope.tbaItem = undefined;
        $scope.tbaCategory = undefined;
    };
    
    // List for the listReorderEvent emitted by the "dir-sortable" directive
    $scope.$on("listReorderedEvent", function(event, value) {
        console.log("Reordering...");
        $scope.items.splice(value.to, 0, $scope.items.splice(value.from, 1)[0]);
    });

});