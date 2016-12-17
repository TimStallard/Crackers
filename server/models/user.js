// User model
var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	name: {
		type: String,
        required: true
	},
	UUID: {
		type: String,
        required: true,
        unique: true,
        dropDups: true
	},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
