//  Packages
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');

// Initiala SetUp
var app       = express();
var router    = express.Router();
var port      = process.env.PORT || 3000;
var fs        = require('fs');
var publicdir = __dirname + '/public';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
                secret:"adubohv2oenuob23rub2fubb22ef",
                resave: false,
                saveUninitialized: true
              }));

/*--------------------------------------------/
* Routing GET  *.html
*--------------------------------------------*/


app.get('/',function(req,res,next){
    if(!req.session.user){
      res.redirect('login');
    }else {
      next();
    }
})

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
