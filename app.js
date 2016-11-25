//  Packages
var express = require("express");
var bodyParser = require('body-parser');


// Initiala SetUp
var app       = express();
var router    = express.Router();
var port      = process.env.PORT || 3000;
var fs        = require('fs');
var publicdir = __dirname + '/public';

app.use(bodyParser.urlencoded({ extended: true }));

/*--------------------------------------------/
* Routing GET  *.html
*--------------------------------------------*/
app.use(function(req, res, next) {
  if (req.path.indexOf('.') === -1) {
    var file = publicdir + req.path + '.html';
    fs.exists(file, function(exists) {
      if (exists)
        req.url += '.html';  next();
    });
  }else{next();}
});
app.use(express.static(publicdir));

/*--------------------------------------------/
* Routing POST
*--------------------------------------------*/
require('./process_request.js')(app);

app.listen(port, function () {
   console.log('Server running..http://localhost:3000');
});
