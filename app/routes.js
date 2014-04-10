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
        res.send(200);
    
    });
    
    app.get("/api/listDrop/:email", function(req, res) {
    
        var email = req.params.email;
        delete listDict[email];
        res.send(200);
    
    });
    
    app.get("api/listGet/:email", function(req, res) {
    
        var email = req.params.email;
        var index = Object.keys(listDict).indexOf(email);
        
        if (index == -1) {
            res.send(200, {items: []});
        }
        else {
            var list = listDict[email];
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