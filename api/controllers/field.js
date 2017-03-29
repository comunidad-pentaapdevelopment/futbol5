'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require ('mongoose-Pagination');
var Field = require('../models/field');
var Turn = require('../models/turn');

function getField(req, res){
	var fieldId = req.params.id;

	Field.findById(fieldId, (err, field) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!field){
				res.status(404).send({message: 'La cancha no existe'});
			}else{
				res.status(200).send({field});
			}
		}
	});

}

function getFields(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	var itemsPerPage = 4;

	Field.find().sort('description').paginate(page, itemsPerPage, function(err,fields,total){
		if(err){
			res.status(500).send({message:'Error en la petición'});
		}else{
			if(!fields){
				res.status(404).send({message:'No hay canchas!!'});
			}else{
				return res.status(200).send({
					total_items: total,
					fields: fields
				});
			}
		}
	});
}

function saveField(req, res){
	var field = new Field();

	var params = req.body;
	field.description = params.description;
	field.price = params.price;
	field.image = 'null';
	field.available = true;

	field.save((err, fieldStored) => {
		if(err){
			res.status(500).send({message:'Error al guardar la cancha'});
		}else{
			if(!fieldStored){
				res.status(404).send({message:'La cancha no ha sido guardado'});
			}else{
				res.status(200).send({field: fieldStored});
			}
		}
	});
}

function updateField(req, res){
	var fieldId = req.params.id;
	var update = req.body;

	Field.findByIdAndUpdate(fieldId, update, (err, fieldUpdated) =>{
		if(err){
			res.status(500).send({message:'Error al actualizar la cancha'});
		}else{
			if(!fieldUpdated)
			{
				res.status(404).send({message:'La cancha no ha sido actualizada'});
			}else{
				res.status(200).send({field: fieldUpdated});
			}
		}
	});
}

function deleteField(req, res){
	var fieldId = req.params.id;

	Field.findByIdAndRemove(fieldId, (err, fieldRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!fieldRemoved){
				res.status(404).send({message: 'No se ha borrado la cancha'});
			}else{
				res.status(200).send({field: fieldRemoved});
			}
		}
	});
}

function uploadImage(req, res){
	var fieldId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			Field.findByIdAndUpdate(fieldId, {image: file_name}, (err,fieldUpdated) =>{
				if(err){
					res.status(500).send({message:'Error al actualizar la cancha'});
				}else{
					if(!fieldUpdated){
						res.status(404).send({message:'No se ha podido actualizar la cancha'});
					}else{
						res.status(200).send({field: fieldUpdated});
						}
					}
						});

		}else{
			res.status(200).send({message:'Extensión del archivo no valida'});
		}
	}else{
		res.status(200).send({message:'No se ha subido ninguna imagen...'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/fields/'+imageFile;

	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la imagen...'});
		}
	});
}

module.exports = {
	getField,
	getFields,
	saveField,
	updateField,
	deleteField,
	uploadImage,
	getImageFile
};
