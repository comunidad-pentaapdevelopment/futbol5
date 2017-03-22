'use strict'

var express = require('express');
var FieldController = require('../controllers/field');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/fields'});

api.get('/field/:id', md_auth.ensureAuth, FieldController.getField);
api.get('/fields/:page?', md_auth.ensureAuth, FieldController.getFields);
api.post('/field', md_auth.ensureAuth, FieldController.saveField);
api.put('/field/:id', md_auth.ensureAuth, FieldController.updateField);
api.delete('/field/:id', md_auth.ensureAuth, FieldController.deleteField);
api.post('/upload-image-field/:id', [md_auth.ensureAuth, md_upload], FieldController.uploadImage);
api.get('/get-image-field/:imageFile',  FieldController.getImageFile);

module.exports = api;