var fs = require('fs');
var User = require('./user');

var login = function(req, res) {
    var username = req.body.user_name;
    var password = req.body.pass_word;
    console.log(req.body);
    User.findOne({
        username: username,
        password: password
    }, function(err, user) {
        if (err || user === null) {
            res.status(403).end();
        } else {
            req.session.user = user;
            res.status(200).end();
        }
    });
};

var signup = function(req, res) {
    var user = new User({
        email: req.body.email,
        username: req.body.user_name,
        password: req.body.pass_word
    }).save(function(err) {
        if (err) {
            //    var html = "An error has occurred;";
            res.status(400);
            res.end();
        }
    });
    //  res.redirect(dist);
    res.end();
};

module.exports = function(app) {


    app.post('/authenticate', function(req, res) {
        login(req, res);
    });

    app.post('/register', function(req, res) {
        signup(req, res);
    });

};
