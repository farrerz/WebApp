var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// var digitaloutputSchema = new Schema({
// 	outputname: {type: String, required: true},
// 	state: Boolean
// });
var actionGroupSchema = new Schema({
  outroomname: {type:String,required: true},
  outroomip: {type:String,required: true},
  outputname: {type:String,required: true},
  outputpin: {type:String,required: true},
  actiontype: String,
  inroomname: String,
  inroomip: String,
  inputname: String,
  inputpin: String,
  actionvalue: {type:String,required: true},
  actiontime: {type:String,required: true}
});
// Model
//var DigitalOutput = mongoose.model('DigitalOutput', digitaloutputSchema);
var ActionGroup = mongoose.model('ActionGroup', actionGroupSchema);
module.exports = ActionGroup;