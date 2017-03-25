import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';

@Component({
	selector: 'client-add',
	templateUrl: '../views/client-add.html',
	providers: [UserService,ClientService]
})

export class ClientAddComponent implements OnInit{
	public titulo: string;
	public client: Client;
	public identity;
	public token;
	public url: string;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _clientService: ClientService
	){
		this.titulo = 'Crear nuevo cliente';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.client = new Client('','','',null,'');
	}

	ngOnInit(){
		console.log('client-add.component.ts cargado');
	}

	onSubmit(){
		console.log(this.client);
		this._clientService.addClient(this.token, this.client).subscribe(
			response => {
				if(!response.client){
					this.alertMessage = 'Error en el servidor';
				}else{
					this.alertMessage = 'El cliente se ha creado correctamente';
					this.client = response.client;
					this._router.navigate(['/clientes', 1]);
				}
			},
			error => {
			   var errorMessage = <any>error;

	  			if(errorMessage != null){
	  				var body = JSON.parse(error._body);
	  				this.alertMessage = body.message;

		  				console.log(error);
	  			}
			}
		);
	}
}