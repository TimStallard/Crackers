// Match model
var mongoose = require('mongoose')

var matchSchema = mongoose.Schema({
	initiator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		requried: true
	},
	partner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
    winner: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
    }
});

module.exports = mongoose.model('Match', matchSchema);
