// User model
var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	name: {
		type: String,
        required: true
	},
    created: {
        type: Date,
        default: Date.now
    },
	socketId: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', userSchema);
