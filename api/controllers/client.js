'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require ('mongoose-Pagination');
var Client = require('../models/client');
var Turn = require('../models/turn');

function getClient(req, res){
	var clientId = req.params.id;

	Client.findById(clientId, (err, client) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!client){
				res.status(404).send({message: 'El cliente no existe'});
			}else{
				res.status(200).send({client});
			}
		}
	});

}

function getClients(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	var itemsPerPage = 10;

	Client.find().sort('surname').paginate(page, itemsPerPage, function(err,clients,total){
		if(err){
			res.status(500).send({message:'Error en la petición'});
		}else{
			if(!clients){
				res.status(404).send({message:'No hay clientes!!'});
			}else{
				return res.status(200).send({
					total_items: total,
					clients: clients
				});
			}
		}
	});
}

function saveClient(req, res){
	var client = new Client();

	var params = req.body;
	client.name = params.name;
	client.surname = params.surname;
	client.phone = params.phone;
	client.dni = params.dni;
	client.email = params.email;

	client.save((err, clientStored) => {
		if(err){
			res.status(500).send({message:'Error al guardar el cliente'});
		}else{
			if(!clientStored){
				res.status(404).send({message:'El cliente no ha sido guardado'});
			}else{
				res.status(200).send({client: clientStored});
			}
		}
	});
}

function updateClient(req, res){
	var clientId = req.params.id;
	var update = req.body;

	Client.findByIdAndUpdate(clientId, update, (err, clientUpdated) =>{
		if(err){
			res.status(500).send({message:'Error al actualizar el cliente'});
		}else{
			if(!clientUpdated)
			{
				res.status(404).send({message:'El cliente no ha sido actualizado'});
			}else{
				res.status(200).send({client: clientUpdated});
			}
		}
	});
}

function deleteClient(req, res){
	var clientId = req.params.id;

	Client.findByIdAndRemove(clientId, (err, clientRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!clientRemoved){
				res.status(404).send({message: 'No se ha borrado el cliente'});
			}else{
				res.status(200).send({client: clientRemoved});
			}
		}
	});
}

module.exports = {
	getClient,
	getClients,
	saveClient,
	updateClient,
	deleteClient
};