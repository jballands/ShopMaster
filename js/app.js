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

// I'm interacting with the jQuery UI sortable widget API in this
// directive: http://api.jqueryui.com/sortable/
shopMaster.directive("sortable", function($compile) {
   
    return {
        restrict: "A",
        link: function(scope, element, attrs){
            
            // jQuery UI widget
            element.sortable({  
                deactivate: function(event, ui) {
                    
                    var from = angular.element(ui.item).scope().$index;
                    var to = element.children().index(ui.item);
        
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

shopMaster.directive("highlighter", function () {

});

// All this directive is doing is showing a popover template. There's a problem,
// however, with injecting the popover into the current scope.
shopMaster.directive("popover", function ($templateCache, $compile) {

    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            
            $(element).popover({
                trigger: "click",
                html: true,
                content: $compile($templateCache.get("tools.html"))(scope),     // Compile that shit!
                placement: "bottom",
                container: "body"
            });
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
    
    $scope.warnFragile = true;
    $scope.warnFrozen = true;
    
    $scope.items = [];
    
    $scope.categories = [
        {Name: "Biscuits", Aisle: "21", Refrigerated: true},
        {Name: "Cheese", Aisle: "21", Refrigerated: true},
        {Name: "Ice Cream", Aisle: "21", Frozen: true},
        {Name: "Waffles", Aisle: "21", Frozen: true},
        {Name: "Frozen Fruit", Aisle: "21", Frozen: true},
        {Name: "Whipped Topping", Aisle: "21", Frozen: true},
        {Name: "Frozen Novelties", Aisle: "21", Frozen: true},
        {Name: "Frozen Breakfast", Aisle: "21", Frozen: true},
        {Name: "Orange Juice", Aisle: "BR", Refrigerated: true},
        {Name: "Milk", Aisle: "BR", Refrigerated: true},
        {Name: "Cream", Aisle: "BR", Refrigerated: true},
        {Name: "Frozen Meals (Single)", Aisle: "20", Frozen: true},
        {Name: "Frozen Meals (Lite)", Aisle: "20", Frozen: true},
        {Name: "Frozen Meals (Family)", Aisle: "20", Frozen: true},
        {Name: "Frozen Meals (Vegetarian)", Aisle: "19", Frozen: true},
        {Name: "Bread (Frozen)", Aisle: "20", Frozen: true},
        {Name: "Vegatables (Frozen)", Aisle: "19", Frozen: true},
        {Name: "International Frozen Foods", Aisle: "20", Frozen: true},
        {Name: "Chicken (Frozen)", Aisle: "19", Frozen: true},
        {Name: "Beef (Frozen)", Aisle: "19", Frozen: true},
        {Name: "Seafood (Frozen)", Aisle: "19", Frozen: true},
        {Name: "Potatoes (Frozen)", Aisle: "19", Frozen: true},
        {Name: "Frozen Snacks", Aisle: "19", Frozen: true},
        {Name: "Pizza", Aisle: "18", Frozen: true},
        {Name: "Pizza (Single)", Aisle: "18", Frozen: true},
        {Name: "Car Accessories", Aisle: "18"},
        {Name: "Air Filters", Aisle: "18"},
        {Name: "Lightbulbs", Aisle: "18", Fragile: true},
        {Name: "Office Supplies", Aisle: "18"},
        {Name: "Pet Treats", Aisle: "17"},
        {Name: "Litter", Aisle: "17"},
        {Name: "Cat Food (Wet)", Aisle: "17"},
        {Name: "Cat Food (Dry)", Aisle: "17"},
        {Name: "Dog Food (Wet)", Aisle: "17"},
        {Name: "Dog Food (Dry)", Aisle: "17"},
        {Name: "Bird Food", Aisle: "17"},
        {Name: "Small Animal Food", Aisle: "17"},
        {Name: "Charcoal", Aisle: "17"},
        {Name: "Toilet Paper", Aisle: "16"},
        {Name: "Tissues", Aisle: "16"},
        {Name: "Party Supplies", Aisle: "16"},
        {Name: "Food Storage", Aisle: "16"},
        {Name: "Storage Bags", Aisle: "16"},
        {Name: "Trash Bags", Aisle: "16"},
        {Name: "Paper Towels", Aisle: "16"},
        {Name: "Cleaning Supplies", Aisle: "15"},
        {Name: "Swiffers", Aisle: "15"},
        {Name: "Mops", Aisle: "15"},
        {Name: "Sponges", Aisle: "15"},
        {Name: "Dish Care", Aisle: "15"},
        {Name: "Bleach", Aisle: "15"},
        {Name: "Fabric Softener", Aisle: "15"},
        {Name: "Detergent", Aisle: "15"},
        {Name: "Air Freshener", Aisle: "15"},
        {Name: "Insect Repellent", Aisle: "15"},
        {Name: "Soda/Soft Drinks", Aisle: "14"},
        {Name: "Bread", Aisle: "14", Fragile: true},
        {Name: "Energy Drinks", Aisle: "14"},
        {Name: "Water", Aisle: "14"},
        {Name: "Buns/Bagels", Aisle: "14", Fragile: true},
        {Name: "Snack Cakes", Aisle: "14", Fragile: true},
        {Name: "Juices", Aisle: "13"},
        {Name: "Sports Drinks", Aisle: "13"},
        {Name: "Family Snacks", Aisle: "13"},
        {Name: "Jam/Jelly", Aisle: "13"},
        {Name: "Peanut Butter", Aisle: "13"},
        {Name: "Pancake Mix", Aisle: "13"},
        {Name: "Syrup", Aisle: "13"},
        {Name: "Breakfast Bars", Aisle: "13"},
        {Name: "Cereal", Aisle: "13"},
        {Name: "Crackers", Aisle: "12"},
        {Name: "Cookies", Aisle: "12"},
        {Name: "Candy", Aisle: "12"},
        {Name: "Chips", Aisle: "12", Fragile: true},
        {Name: "Popcorn", Aisle: "11"},
        {Name: "Baby Toys", Aisle: "11"},
        {Name: "Baby Wipes", Aisle: "11"},
        {Name: "Diapers", Aisle: "11"},
        {Name: "Coffee", Aisle: "11"},
        {Name: "Coffee Filters", Aisle: "11"},
        {Name: "Tea", Aisle: "11"},
        {Name: "Hot Cocca", Aisle: "11"},
        {Name: "Baby Food/Formula", Aisle: "11"},
        {Name: "Condiments", Aisle: "10"},
        {Name: "Pickles", Aisle: "10"},
        {Name: "Spices", Aisle: "10"},
        {Name: "Flour", Aisle: "10"},
        {Name: "Disposable Baking Ware", Aisle: "10"},
        {Name: "Vinegar", Aisle: "10"},
        {Name: "Oil", Aisle: "10"},
        {Name: "Cake Mix", Aisle: "10"},
        {Name: "Gelatin/Jello (Dry)", Aisle: "10"},
        {Name: "Icing", Aisle: "10"},
        {Name: "Sweet Toppings", Aisle: "10"},
        {Name: "Baking Soda", Aisle: "10"},
        {Name: "Sugar", Aisle: "10"},
        {Name: "Salad Dressing", Aisle: "10"},
        {Name: "European Foods", Aisle: "9"},
        {Name: "Mediterranean Foods", Aisle: "9"},
        {Name: "Asian Foods", Aisle: "9"},
        {Name: "Latin American Foods", Aisle: "9"},
        {Name: "Pasta (Canned)", Aisle: "9"},
        {Name: "Pasta (Dry)", Aisle: "9"},
        {Name: "Pasta Sauce", Aisle: "9"},
        {Name: "Tuna", Aisle: "9"},
        {Name: "Soup (Canned)", Aisle:"8"},
        {Name: "Soup (Dry)", Aisle:"8"},
        {Name: "Rice", Aisle:"8"},
        {Name: "Beans", Aisle:"8"},
        {Name: "Potatoes (Instant)", Aisle:"8"},
        {Name: "Gravy", Aisle:"8"},
        {Name: "Pizza Crust", Aisle:"8"},
        {Name: "Vegatables (Canned)", Aisle:"8"},
        {Name: "Tomatoes (Canned)", Aisle:"8"},
        {Name: "Fruit (Canned)", Aisle:"8"},
        {Name: "Mac n' Cheese", Aisle:"8"},
        {Name: "Seasonal Items", Aisle: "7"},
        {Name: "Kitchen Ware", Aisle: "6"},
        {Name: "Greeting Cards", Aisle: "5"},
        {Name: "Coffee Makers", Aisle: "6"},
        {Name: "Plates (Glass)", Aisle: "6", Fragile: true},
        {Name: "Crock Pots", Aisle: "5"},
        {Name: "Cups (Glass)", Aisle: "5", Fragile: true},
        {Name: "Jugs (Glass)", Aisle: "5", Fragile: true},
        {Name: "Toasters", Aisle: "5"},
        {Name: "Utensils (Metal)", Aisle: "5"},
        {Name: "Rags/Towels", Aisle: "5"},
        {Name: "Food Processors", Aisle: "4"},
        {Name: "Blenders", Aisle: "4"},
        {Name: "Pyrex (Glass Bakeware)", Aisle: "4", Fragile: true},
        {Name: "Books", Aisle: "4"},
        {Name: "Sunglasses", Aisle: "4", Fragile: true},
        {Name: "Pots and Pans", Aisle: "4"},
        {Name: "Magazines", Aisle: "4"},
        {Name: "Chips (Organic)", Aisle: "3", Fragile: true},
        {Name: "Nuts (Organic)", Aisle: "3"},
        {Name: "Energy Bars (Organic)", Aisle: "3"},
        {Name: "Drinks (Organic)", Aisle: "3"},
        {Name: "Soda/Soft Drinks (Organic)", Aisle: "3"},
        {Name: "Coffee (Organic)", Aisle: "3"},
        {Name: "Soup (Organic)", Aisle: "3"},
        {Name: "Sauces (Organic)", Aisle: "3"},
        {Name: "Juices (Organic)", Aisle: "3"},
        {Name: "Beauty (Natural)", Aisle: "3"},
        {Name: "Wheat/Gluten-Free Foods", Aisle: "2"},
        {Name: "Cookies (Organic)", Aisle: "2"},
        {Name: "Crackers (Organic)", Aisle: "2"},
        {Name: "Chocolate (Organic)", Aisle: "2"},
        {Name: "Cereal (Organic)", Aisle: "2"},
        {Name: "Frozen Foods (Organic)", Aisle: "2", Frozen: true},
        {Name: "Milk (Organic)", Aisle: "2", Refrigerated: true},
        {Name: "Beer", Aisle: "1", Refrigerated: true},
        {Name: "Fruit", Aisle: "BL", Fragile: true},
        //{Name: "Apples", Aisle: "BL", Fragile: true},
        {Name: "Potatoes", Aisle: "BL"},
        //{Name: "Onions", Aisle: "BL"},
        {Name: "Produce", Aisle: "BL", Fragile: true},
        {Name: "Salad Dressing (Cold)", Aisle: "BL", Refrigerated: true},
        {Name: "Cake", Aisle: "BL", Fragile: true},
        {Name: "Delicatessen", Aisle: "FL", Refrigerated: true, Fragile: true},
        {Name: "Hot Meals", Aisle: "FL"},
        {Name: "Wine", Aisle: "FL"},
        {Name: "Cheese (Fancy)", Aisle: "FL"},
        {Name: "Spreads (Hummus)", Aisle: "FL"},
        {Name: "Sushi", Aisle: "FL"},
        {Name: "Beef", Aisle: "BK", Refrigerated: true},    // keep?
        {Name: "Chicken", Aisle: "BK", Refrigerated: true}, // keep?
        {Name: "Meat (Fresh)", Aisle: "BK", Refrigerated: true},
        {Name: "Seafood (Fresh)", Aisle: "BK", Refrigerated: true},
        {Name: "Meat (Organic)", Aisle: "BK", Refrigerated: true},
        {Name: "Prepared Meats", Aisle: "BK", Refrigerated: true},
        {Name: "Sausage", Aisle: "BK", Refrigerated: true},
        {Name: "Lunch Meats", Aisle: "BK", Refrigerated: true},
        {Name: "Bacon", Aisle: "BK", Refrigerated: true},
        {Name: "Eggs", Aisle: "BK", Refrigerated: true, Fragile: true},
        {Name: "Butter", Aisle: "BK", Refrigerated: true},
        {Name: "Yogurt", Aisle: "BK", Refrigerated: true},
        {Name: "Gelatin/Jello (Cold)", Aisle: "BK", Refrigerated: true},
        {Name: "Sour Cream", Aisle: "BK", Refrigerated: true},
        {Name: "Cotton Balls", Aisle: "A"},
        {Name: "Nail Care", Aisle: "A"},
        {Name: "Cosmetics", Aisle: "A"},
        {Name: "Acne", Aisle: "A"},
        {Name: "Face Care", Aisle: "A"},
        {Name: "Sunscreen", Aisle: "B"},
        {Name: "Hair Care", Aisle: "B"},
        {Name: "Bubble Bath", Aisle: "D"},
        {Name: "Lotion", Aisle: "D"},
        {Name: "Hand Soap", Aisle: "D"},
        {Name: "Hand Sanitizer", Aisle: "D"},
        {Name: "Shampoo", Aisle: "D"},
        {Name: "Incontinence", Aisle: "F"},
        {Name: "Adult Nutrition", Aisle: "F"},
        {Name: "Pain Relief", Aisle: "H"},
        {Name: "Fiber", Aisle: "H"},
        {Name: "Laxitives", Aisle: "H"},
        {Name: "Heartburn Medication", Aisle: "H"},
        {Name: "First Aid", Aisle: "G"},
        {Name: "Heat Wraps", Aisle: "G"},
        {Name: "Eye Care", Aisle: "G"},
        {Name: "Foot Care", Aisle: "G"},
        {Name: "Travel-Sized Items", Aisle: "G"},
        {Name: "Mouthwash", Aisle: "E"},
        {Name: "Toothpaste", Aisle: "E"},
        {Name: "Toothbrushes", Aisle: "E"},
        {Name: "Styling Tools", Aisle: "C"},
        {Name: "Hair Brushes", Aisle: "C"},
        {Name: "Deodorant", Aisle: "C"},
        {Name: "Hair Color", Aisle: "C"},
        {Name: "Pharmacy", Aisle: "FR"},
        {Name: "Vitamins", Aisle: "FR"},
        {Name: "Family Planning", Aisle: "FR"},
        {Name: "Feminine Items", Aisle: "FR"},
        {Name: "Socks", Aisle: "FR"},
        {Name: "Protein Powder", Aisle: "FR"},
        {Name: "Shaving Cream", Aisle: "FR"},
        {Name: "Razors", Aisle: "FR"},
        {Name: "Cold/Flu Medication", Aisle: "FR"},
        {Name: "Lip Balm", Aisle: "FR"}
    ];
    
    $scope.addItem = function(items) {
        
        var item = $scope.tbaItem;
        var cat = $scope.tbaCategory;
        
        // Find the item and get its category
        var wanted = $scope.categories.filter( function(category){
            return (category.Name == cat);
        });
        
        $scope.items.unshift({ name: item, category: cat, aisle: wanted[0].Aisle });
        
        $scope.tbaItem = undefined;
        $scope.tbaCategory = undefined;
    };
    
    $scope.removeItem = function(index) {
        
        $scope.items.splice(index, 1);
        
    }
    
    // List for the listReorderEvent emitted by the "dir-sortable" directive
    $scope.$on("listReorderedEvent", function(event, value) {
        $scope.items.splice(value.to, 0, $scope.items.splice(value.from, 1)[0]);
    });  

});