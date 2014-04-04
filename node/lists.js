var listDict = {};

module.exports = {

    emailVerify: function(req, res) {
        
        var email = req.params.email;
        var index = Object.keys(listDict).indexOf(email);
    
        if (index == -1) {
            res.send({availability: false});
        }
        else {
            res.send({availability: true});
        }
    },
    
    listAdd: function(req, res) {
        
        var email = req.body.email;
        var list = req.body.list;
        
        listDict[email] = list;
        
        console.log(listDict);
        
        res.send({status: "ok"});
    },
    
    listDrop: function(req, res) {
        var email = req.params.email;
        
        delete listDict[email];
        
        console.log(listDict + ", with param " + email);
        
        res.send({status: "ok"});
    },
    
    listGet: function(req, res) {
        var email = req.params.email;
        var index = Object.keys(listDict).indexOf(email);
    
        if (index == -1) {
            res.send({items: []});
        }
        else {
            var list = listDict[email];
            res.send({items: list});
        }
    }
    
};