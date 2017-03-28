import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';

@Component({
	selector: 'client-edit',
	templateUrl: '../views/client-add.html',
	providers: [UserService,ClientService]
})

export class ClientEditComponent implements OnInit{
	public titulo: string;
	public client: Client;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public is_edit;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _clientService: ClientService
	){
		this.titulo = 'Editar Cliente';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.client = new Client('','','',null,'');
		this.is_edit = true;
	}

	ngOnInit(){
		console.log('client-edit.component.ts cargado');
		// Llamar al metodo del api para sacar un cliente en base a su id getClient
		this.getClient();
	}

	getClient(){
		this._route.params.forEach((params: Params) => {
			let id = params['id']; // sacamos el id que nos llega por la url

			this._clientService.getClient(this.token, id).subscribe(
				response => {
					if(!response.client){
						this._router.navigate(['/']);
					}else{
						this.client = response.client;
					}
				},
				error => {
				   var errorMessage = <any>error;

		  			if(errorMessage != null){
		  				var body = JSON.parse(error._body);
		  				//this.errorMessage = body.message;
		  			}
				}
			);
		});
	}

	onSubmit(){
		this._route.params.forEach((params: Params) => {
			let id = params['id']; // sacamos el id que nos llega por la url
			console.log(this.client);

			this._clientService.editClient(this.token, id,this.client).subscribe(
				response => {
					if(!response.client){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = 'El Cliente se ha actualizado correctamente';
						this._router.navigate(['/clientes', 1]);
					}
				},
				error => {
				   var errorMessage = <any>error;

		  			if(errorMessage != null){
		  				var body = JSON.parse(error._body);
		  				//this.alertMessage = body.message;
		  			}
				}
			);
		});
  	}

}