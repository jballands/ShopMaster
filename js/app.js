/*
 *  Defines the ShopMaster app using Angular.js
 *
 *  Coded with <3 by Jonathan Ballands :)
 */

var shopMaster = angular.module("shopMaster", ["ngRoute"]);
var categories = ["Pastry", "Produce", "Jam"];

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
    
    // TODO: Something...

});