var fs = require('fs');
var User = require('./user');
var Room = require('./room');
var ActionGroup = require('./actiongroup');
var http = require('http');

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

// var req = http.get({host: '192.168.10.109',path:'/info'}, function(res) {
//   //console.log('STATUS: ' + res.statusCode);
//   //console.log('HEADERS: ' + JSON.stringify(res.headers));
//     Room.find(function (err, rooms) {
//         if (err) return console.error(err);
//         console.log(rooms);
//         });
//   // Buffer the body entirely for processing as a whole.
//   var bodyChunks = [];
//   res.on('data', function(chunk) {
//     // You can process streamed parts here...
//     bodyChunks.push(chunk);
//   }).on('end', function() {

//     var body = Buffer.concat(bodyChunks);
//     //console.log('BODY: ' + body);
//     //var obj = JSON.parse(fs.readFileSync(body, 'utf8'));
//     var obj = JSON.parse(body);
//     //console.log("OBJ       +" +JSON.stringify(obj));
//     var room = Room.findOne({'roomname':obj.RoomName}, function(err,room){
//         if(err)throw err;
//         //console.log(room);
//         if(room == null){
//             console.log("add!! ");
//             addMod(obj,'192.168.10.109');
//         }
//         //console.log("OutCOunt: " + room.digitaloutputs[0]);
//     });
    
    
//     // ...and/or process the entire body here.
//   })
// });
function addMod(obj,ipaddr) {
    //var roomsss = Room.find({});
    
   // mod.digitaloutputs.push(tempdout._id);
    //console.log("ROOM: " + Room.findOne().roomname);
    //console.log("USER: " + User.findOne().username);
    //console.log("data = " + JSON.stringify(obj));
    //console.log("Room :  " + Room.find()[0]);
    //console.log("Room :  " + obj.digitalOutputs[0].outputName);
    var names = [];
    var pins = [];
    var tempFinal = [];
    for(var i = 0; i <obj.digitalOutputs.length; i++){
        console.log("Run");
        tempFinal.push({outputname: obj.digitalOutputs[i].outputName, pin: obj.digitalOutputs[i].pin});
    }
    //console.log("TEMPFINAL: " +tempFinal);
    var mod = new Room();
    mod.roomname = obj.RoomName;
    mod.digitaloutputs = tempFinal;
    mod.ipaddr = ipaddr;
    console.log("mod Douts: " + mod.digitaloutputs[0]);
    mod.save(function(err){
        if(err){
            console.log(err);
        }
    });
    // var room = Room.findOne({'roomname':obj.RoomName}, function(err,room){
    //     if(err)throw err;
    //     console.log("roomname: " + room.roomname);
    //     console.log("OutCOunt: " + room.digitaloutputs[0]);
    // });
   // mod.digitaloutputs.push(tempdout._id);
    // console.log("ROOM: " + Room.findOne().roomname);
    // console.log("USER: " + User.findOne().username);

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
        app.get('/api/getRooms',function(req,res){
            Room.find(function (err, rooms) {
                if (err) return console.error(err);
                    return res.json(rooms);
                });
            //return res.json([{'title':'','text':'Hello World one!!!'},{'title':'Cell2','text':'Hellow World Two!!'}]);
        });
        app.get('/api/getActionGroups',function(req,res){
            ActionGroup.find(function (err, actiongroups) {
                if (err) return console.error(err);
                    return res.json(actiongroups);
                });
            //return res.json([{'title':'','text':'Hello World one!!!'},{'title':'Cell2','text':'Hellow World Two!!'}]);
        });
        app.post('/register', function(req, res) {
            signup(req, res);
        });
        app.post('/addaction', function(req,res){
           console.log(req.body.room);
                var ag = new ActionGroup({
                    outroomname: req.body.room,
                    outroomip: req.body.ipaddr,
                    outputname: req.body.output,
                    outputpin: req.body.outputpin,
                    actiontime: req.body.newTime,
                    actionvalue: req.body.actionValue
                }).save(function(err) {
                if (err) {
                    //    var html = "An error has occurred;";
                    
                }else{
                    res.status(200);
                    res.end();
                    return;
                }
            });
            
        })
        app.post('/addroom', function(req,res){
            console.log(req.body.newipaddr);
            try{
            var test = http.get('http://'+req.body.newipaddr +'/info', function(r) {
              //console.log('STATUS: ' + res.statusCode);
              //console.log('HEADERS: ' + JSON.stringify(res.headers));
            Room.find(function (err, rooms) {
                if (err){
                    res.status(400);
                    res.end();
                    return;
                }
                    console.log(rooms);
                    
                });
              // Buffer the body entirely for processing as a whole.
            var bodyChunks = [];
            
            r.on('data', function(chunk) {
                // You can process streamed parts here...
                bodyChunks.push(chunk);
            }).on('end', function() {

                var body = Buffer.concat(bodyChunks);
                //console.log('BODY: ' + body);
                //var obj = JSON.parse(fs.readFileSync(body, 'utf8'));
                var obj = JSON.parse(body);
                //console.log("OBJ       +" +JSON.stringify(obj));
                var room = Room.findOne({'roomname':obj.RoomName}, function(err,room){
                    if(err){
                        res.status(400);
                        res.end();
                        return;
                    }
                    //console.log(room);
                    if(room == null){
                        console.log("add!! ");
                        addMod(obj,req.body.newipaddr);
                        res.status(200);
                        res.end();
                        return;
                    }
                    res.status(409);
                    res.end();
                    return;
                });
    
    // ...and/or process the etire body here.
                })
            });
            test.on('error', function(e) {
    // Call callback function with the error object which comes from the request
                res.status(400);
                res.end();
                return;
            });
            test.on('socket', function (socket) {
                socket.setTimeout(5000);  
                    socket.on('timeout', function() {
                        test.abort();
                        res.status(400);
                        res.end();
                        return;
                    });
            });
            }catch(e){
                res.status(400);
                res.end();
                return;
            }
            // ...and/or process the entire body here.

        });

    //this.addRoom = addMod();

};
