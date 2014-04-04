var express = require("express");
var lists = require("./lists");
 
var app = express();
app.use(express.json()); 
app.use(express.urlencoded());
 
app.get("/emailVerify/:email", lists.emailVerify);   // GET
app.post("/listAdd", lists.listAdd);                // POST
app.get("/listDrop/:email", lists.listDrop);         // GET
app.get("/listGet/:email", lists.listGet);           // GET
 
app.listen(8888);
console.log("Server started on port 8888...");