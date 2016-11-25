
var fs = require('fs');


var login = function(req, res){
    var username = req.body.user_name;
    var password = req.body.pass_word;
    var html = "Logged In\n";
    html += "Username:" + username + "\nPassword:" + password;
    res.send(html);
}

var signup = function(req, res, dist ){

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
