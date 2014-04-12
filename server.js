/*
 *  server.js (node.js back-end processing)
 *  By Jonathan Ballands, Sloane Neidig, and Brad Retterer
 *  
 *  (C)2014 All Rights Reserved.
 */

// Express
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

app.configure(function() {
    app.use(express.static(__dirname + "/public"));
    app.use(express.logger("dev"));
    app.use(express.json());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride()); 
});

require("./app/routes.js")(app);

// Start listening
app.listen(port);
console.log("Server listening on port " + port);