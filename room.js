var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// var digitaloutputSchema = new Schema({
// 	outputname: {type: String, required: true},
// 	state: Boolean
// });
var roomSchema = new Schema({
  roomname: { type: String, required: true, unique: true },
  ipaddr: String,
  digitaloutputs: [{
  	outputname: String, id: String, pin: String
  }],
  analogoutputs: [{
  	outputname: String, id: String, pin: String
  }],
  analogInputs: [{
  	inputname: String,  id: String, pin: String
  }]
});
// Model
//var DigitalOutput = mongoose.model('DigitalOutput', digitaloutputSchema);
var Room = mongoose.model('Room', roomSchema);
module.exports = Room;