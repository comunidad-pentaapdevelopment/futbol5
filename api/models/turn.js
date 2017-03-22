'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TurnSchema = Schema({
		hourFrom: Date,
		hourUntil: Date,
		totalHour: Number,
		totalToPay: Number,
		field: {type: Schema.ObjectId, ref:'Field'},
	    user: {type: Schema.ObjectId, ref:'User'},
	    client: {type: Schema.ObjectId, ref:'Client'}
});

module.exports = mongoose.model('Turn', TurnSchema);