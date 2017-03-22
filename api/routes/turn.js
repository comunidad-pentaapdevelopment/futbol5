'use strict'

var express = require('express');
var TurnController = require('../controllers/turn');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

api.get('/turn/:id', md_auth.ensureAuth, TurnController.getTurn);
api.get('/turns/:page?', md_auth.ensureAuth, TurnController.getTurns);
api.post('/turn', md_auth.ensureAuth, TurnController.saveTurn);

module.exports = api;