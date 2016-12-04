var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// var digitaloutputSchema = new Schema({
// 	outputname: {type: String, required: true},
// 	state: Boolean
// });
var actionGroupSchema = new Schema({
  outputname: String,
  outputid: String
  actiontype: String,
  inputname: String,
  inputid: String,
  actionvalue: Number
});
// Model
//var DigitalOutput = mongoose.model('DigitalOutput', digitaloutputSchema);
var ActionGroup = mongoose.model('ActionGroup', actionGroupSchema);
module.exports = ActionGroup;