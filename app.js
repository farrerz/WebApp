//  Packages
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var repeat = require('repeat');
var helpers = require('./process_request');
// Initiala SetUp
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;
var fs = require('fs');
var publicdir = __dirname + '/public';

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(session({
    secret: "adubohv2oenuob23rub2fubb22ef",
    resave: false,
    saveUninitialized: true
}));
/*--------------------------------------------/
 * Repeat Task
 *--------------------------------------------*/

function runTask() {
  console.log("Runing tasks..");
};

repeat(runTask).every(30, 'sec').start.in(1, 'sec');
/*--------------------------------------------/
 * Routing GET  *.html
 *--------------------------------------------*/
// app.get('/api/getCells',function(req,res){
//     return res.json([{'title':'Cell1','text':'Hello World one!!!'},{'title':'Cell2','text':'Hellow World Two!!'}]);
// });

app.get('/', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('login');
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    if (req.path.indexOf('.') === -1) {
        var file = publicdir + req.path + '.html';
        fs.exists(file, function(exists) {
            if (exists)
                req.url += '.html';
            next();
        });
    } else {
        next();
    }
});
app.use(express.static(publicdir));

/*--------------------------------------------/
 * Routing POST
 *--------------------------------------------*/
require('./process_request.js')(app);
//app.process_request.addModule()
// var req = http.get({host: '192.168.10.109',path:'/info'}, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));

//   // Buffer the body entirely for processing as a whole.
//   var bodyChunks = [];
//   res.on('data', function(chunk) {
//     // You can process streamed parts here...
//     bodyChunks.push(chunk);
//   }).on('end', function() {
//     var body = Buffer.concat(bodyChunks);
//     console.log('BODY: ' + body);
//     helpers.addRoom(body);
//     // ...and/or process the entire body here.
//   })
// });
app.listen(port, function() {
    console.log('Server running..http://localhost:3000');
});
