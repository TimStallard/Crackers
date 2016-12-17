// Match model
var mongoose = require('mongoose')

var matchSchema = mongoose.Schema({
	initiator: {
		acceleration: {
			type: Number,
			required: false
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false
		}
	},
	partner: {
		acceleration: {
			type: Number,
			required: false
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false
		}
	},
	code: {
		type: String,
		required: true
	},
    winner: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
    }
});

module.exports = mongoose.model('Match', matchSchema);
