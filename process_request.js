
var fs = require('fs');
var User = require('./user');

var login = function(req, res){
    var username = req.body.user_name;
    var password = req.body.pass_word;
    console.log(username);
    User.findOne({ username: username, password:password},function(err,user){
      if (err || user==null){
        res.redirect("login");
      }else{
        res.redirect("index");
      }
    });
}

var signup = function(req, res, dist ){
    var user = new User({
      email: req.body.email,
      username: req.body.user_name,
      password: req.body.pass_word
    }).save(function(err){
      if (err){
          var html = "An error has occurred;";
          res.send(html);
      }
    });
    res.redirect(dist);
}

module.exports = function (app) {
    app.post('/process', function(req, res){
        if (req.query.form == "login_form"){
            login(req, res);
        }else if (req.query.form == "signup_form"){
            signup(req,res, "login");
        }
    });

};
