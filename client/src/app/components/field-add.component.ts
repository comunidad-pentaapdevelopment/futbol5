import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { FieldService } from '../services/field.service';
import { Field } from '../models/field';

@Component({
	selector: 'field-add',
	templateUrl: '../views/field-add.html',
	providers: [UserService,FieldService]
})

export class FieldAddComponent implements OnInit{
	public titulo: string;
	public field: Field;
	public identity;
	public token;
	public url: string;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _fieldService: FieldService
	){
		this.titulo = 'Crear nueva cancha';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.field = new Field('',0,'',true);
	}

	ngOnInit(){
		console.log('field-add.component.ts cargado');
	}

	onSubmit(){
		console.log(this.field);
		this._fieldService.addField(this.token, this.field).subscribe(
			response => {
				if(!response.field){
					this.alertMessage = 'Error en el servidor';
				}else{
					this.alertMessage = 'La cancha se ha creado correctamente';
					this.field = response.fied;
					this._router.navigate(['/editar-cancha', response.field._id]);
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