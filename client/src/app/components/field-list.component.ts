import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import{ GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { FieldService } from '../services/field.service';
import { Field } from '../models/field';

@Component({
	selector: 'field-list',
	templateUrl: '../views/field-list.html',
	providers: [UserService,FieldService]
})

export class FieldListComponent implements OnInit{
	public titulo: string;
	public fields: Field[];
	public identity;
	public token;
	public url: string;
	public next_page;
	public prev_page;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _fieldService: FieldService
	){
		this.titulo = 'Canchas';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.next_page = 1;
		this.prev_page = 1;
	}

	ngOnInit(){
		console.log('field-list.component.ts cargado');

		// Conseguir el listado de clientes
		this.getFields();
	}

	getFields(){
		this._route.params.forEach((params: Params) => {
			let page = +params['page'];
			if(!page){
				page = 1;
			}else{
				this.next_page = page+1;
				this.prev_page = page-1;

				if(this.prev_page == 0){
					this.prev_page = 1;
				}
			}

			this._fieldService.getFields(this.token,page).subscribe(
				response => {
					if(!response.fields){
						this._router.navigate(['/']);
					}else{
						this.fields = response.fields;
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

	public confirmado;
	onDeleteConfirm(id){
		this.confirmado = id;
	}

	onCancelField(){
		this.confirmado = null;
	}

	onDeleteField(id){
		this._fieldService.deleteField(this.token, id).subscribe(
			response => {
					if(!response.field){
						alert('Error en el servidor');
					}
					this.getFields();
				},
			error => {
			   var errorMessage = <any>error;

	  			if(errorMessage != null){
	  				var body = JSON.parse(error._body);
	  				//this.errorMessage = body.message;
	  			}
			}
		);
	}
}