'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FieldSchema = Schema({
		description: String,
		price: Number,
		image: String,
		available: Boolean
});

module.exports = mongoose.model('Field', FieldSchema);