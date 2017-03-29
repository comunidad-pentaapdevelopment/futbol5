import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { FieldService } from '../services/field.service';
import { UploadService } from '../services/upload.service';
import { Field } from '../models/field';

@Component({
	selector: 'field-edit',
	templateUrl: '../views/field-add.html',
	providers: [UserService,FieldService,UploadService]
})

export class FieldEditComponent implements OnInit{
	public titulo: string;
	public field: Field;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public is_edit;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _uploadService: UploadService,
		private _fieldService: FieldService
	){
		this.titulo = 'Editar Cancha';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.field = new Field('',0,'',true);
		this.is_edit = true;
	}

	ngOnInit(){
		console.log('field-edit.component.ts cargado');
		// Llamar al metodo del api para sacar un artista en base a su id getArtist
		this.getField();
	}

	getField(){
		this._route.params.forEach((params: Params) => {
			let id = params['id']; // sacamos el id que nos llega por la url

			this._fieldService.getField(this.token, id).subscribe(
				response => {
					if(!response.field){
						this._router.navigate(['/']);
					}else{
						this.field = response.field;
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
			console.log(this.field);

			this._fieldService.editField(this.token, id,this.field).subscribe(
				response => {
					if(!response.field){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = 'La cancha se ha actualizado correctamente';

						if(!this.filesToUpload){
							this._router.navigate(['/canchas', 1]);
						}else{
						// Subir la imagen del artista
						this._uploadService.makeFileRequest(this.url+'upload-image-field/'+id,[],this.filesToUpload,this.token,'image')
							.then(
								(result) => {
									this._router.navigate(['/canchas', 1]);
								},
								(error) =>{
									console.log(error);
								}
							);
						}
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

  	public filesToUpload: Array<File>;
  	fileChangeEvent(fileInput: any){
  		this.filesToUpload = <Array<File>>fileInput.target.files;
  	}
}