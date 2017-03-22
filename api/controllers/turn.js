'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require ('mongoose-Pagination');
var Turn = require('../models/turn');
var Client = require('../models/client');
var User = require('../models/user');
var Field = require('../models/field');


function getTurn(req, res){
	var turnId = req.params.id;

	Turn.findById(turnId, (err, turn) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!artist){
				res.status(404).send({message: 'El turno no existe'});
			}else{
				res.status(200).send({turn});
			}
		}
	});

}

function getTurns(req, res){
	var fieldId = req.params.field;

	if (!fieldId) {
		// sacar todas los turnos  de la bd
		var find = Turn.find({}); // sort es para ordenar
	}else{
		// sacar los turnos de una cancha concreta de la bd
		var find = Turn.find({field: fieldId});
	}

	find.populate({path: 'field'}).exec((err, turns) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!turns){
				res.status(404).send({message: 'No hay turnos'});
			}else{
				res.status(200).send({turns});
			}
		}
	});
}

function saveTurn(req, res){
	var turn = new Turn();

	var params = req.body;
	turn.hourFrom = params.hourFrom;
	turn.hourUntil = params.hourUntil;
	turn.totalHour = 0; // Averiguar como restar la hora hasta menos la hora desde para tener el total de horas
	turn.totalToPay = 0; // Averiguar como multiplicar el total de horas con el precio de la cancha
	turn.field = params.field;
	//turn.field.state = false; // Le cambiamos el estado a la cancha a falso xq va a estar ocupada a la hora de iniciar el turno
	turn.user = params.user;
	turn.client = params.client;


	turn.save((err, turnStored) =>{
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!turnStored){
				res.status(404).send({message: 'No se ha guardado el turno'});
			}else{
				res.status(200).send({turn: turnStored});
			}
		}
	});
}

module.exports = {
	getTurn,
	getTurns,
	saveTurn
};