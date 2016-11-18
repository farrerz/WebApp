//  Packages
var express = require("express");
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
// Routing
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile("index.html", {"root": __dirname});
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile("404.html", {"root": __dirname});
});

app.listen(port, function () {
   console.log('Server running..');
});
