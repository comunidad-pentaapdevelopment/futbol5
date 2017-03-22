'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
		name: String,
		surname: String,
		phone: String,
		dni: Number,
		email: String
});

module.exports = mongoose.model('Client', ClientSchema);