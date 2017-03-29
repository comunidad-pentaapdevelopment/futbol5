import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Field } from '../models/field';

@Injectable()
export class FieldService{
	public url: string;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	getFields(token, page){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'fields/'+page,options)
						 .map(res => res.json());
	}

	getField(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'field/'+id,options)
						 .map(res => res.json());
	}

	addField(token, field: Field){
		let params = JSON.stringify(field);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization': token
		});

		return this._http.post(this.url+'field', params, {headers: headers})
						 .map(res => res.json());
	}

	editField(token, id:string, field: Field){
		let params = JSON.stringify(field); // Convertimos el objeto a un json
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization': token
		});

		return this._http.put(this.url+'field/'+id, params, {headers: headers})
						 .map(res => res.json());
	}

	deleteField(token, id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url+'field/'+id,options)
						 .map(res => res.json());
	}
}