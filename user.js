var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webapp');
var Schema = mongoose.Schema;

// Scheme
var userSchema = new Schema({
    email: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Model
var User = mongoose.model('User', userSchema);

// END
module.exports = User;
