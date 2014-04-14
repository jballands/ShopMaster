/*
 *  routes.js
 *  By Jonathan Ballands, Sloane Neidig, and Brad Retterer
 *  
 *  (C)2014 All Rights Reserved.
 */

var ListDict = {};

module.exports = function(app) {
    
    /*
     *  ShopMaster API
     */
    app.get("/api/emailVerify/:email", function(req, res) {
    
        var email = req.params.email;
        var index = Object.keys(ListDict).indexOf(email);
        
        if (index == -1) {
            res.json(200, { available: true });
        }
        
        else {
            res.json(200, { available: false });
        }
    
    });
    
    app.post("/api/listAdd", function(req, res) {
    
        var email = req.body.email;
        var list = req.body.list;    
        ListDict[email] = list;
        
        console.log("The server now has the following data: ");
        console.log(ListDict);
        
        res.send(200);
    
    });
    
    app.get("/api/listDrop/:email", function(req, res) {
    
        var email = req.params.email;
        delete listDict[email];
        res.send(200);
    
    });
    
    app.get("/api/listGet/:email", function(req, res) {
        
        var email = req.params.email;
        var index = Object.keys(ListDict).indexOf(email);
        
        if (index == -1) {
            res.send(200, {items: []});
        }
        else {
            var list = ListDict[email];
            res.send(200, {items: list});
        }
    
    });
    
    
    /*
     *  Application Serving
     */
    app.get("*", function(req, res) {
		res.sendfile("./public/index.html");
	});
    
};