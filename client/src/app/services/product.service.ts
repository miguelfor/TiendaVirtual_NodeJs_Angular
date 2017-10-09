import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global';
import { Product}from '../models/product';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ProductService{
	public url: string;
  public identity;
  public token;
	public countt;

	private item : any = {};
   private carShoping : any[] = [];
   private articulos: any[] = [];

	constructor(private _http: Http){
		this.url = GLOBAL.url;
		//this.count=this.countCanasta();
	}

  getProducts(token,page){
    let headers = new Headers({
      'Content-type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers:headers});
    return this._http.get(this.url+'products/'+page,options)
                    .map(res=> res.json());
  }
	 getProductsId(token,id){
		let headers = new Headers({
			'Content-type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers:headers});
		return this._http.get(this.url+'description-products/'+id,options)
										.map(res=> res.json());
	}
	getCarrito(){
		return this.articulos;
	}
	getTotal(){
		let total=0;
		for(var i=0;i<this.articulos.length;i++){
		   total=total+(parseInt(this.articulos[i].precio)*this.articulos[i].cantidad);

			}
			return total;
	}

	carritoCancelar(){
		localStorage.removeItem('names');
	}

	carritoPagar(token){
		console.log(token);


for(var i=0;i<this.articulos.length;i++){

	console.log(this.articulos[i].id);
	console.log(this.articulos[i].cantidad);

	  let url = this.url+'update-products/'+this.articulos[i].id+'/'+this.articulos[i].cantidad;

		var username = "miguel";
	  var password = "data.credentials.password";

	  var creds = "username=" + username + "&password=" + password;

	  var headers = new Headers();
	  headers.append('Content-Type', 'application/x-www-form-urlencoded');

	  this._http.post(url, creds, {
	    headers: headers
	    })
	    .map(res => res.json())
	    .subscribe(
	      () => console.log('Authentication Complete')
	    );
	}
this.carritoCancelar();
}



countCanasta(){
if(localStorage['names'] != undefined){
		var storedArticulos=JSON.parse(localStorage['names']);
		this.articulos=storedArticulos;
	  this.countt=storedArticulos.length;
}else{
	this.countt=0;
}
	return this.countt;
}

	addCanasta(articuloSel,a) {

    a= parseInt(a);
    var bandera=0;
		//  if(this.articulos.length==0){
  if(localStorage['names'] == undefined){
      this.articulos.push({id: articuloSel._id
                        , nombre: articuloSel.nombre
                        , img: articuloSel.img
                        , precio: articuloSel.precio
                        , cantidad:a })
    }else{
      for(var i=0;i<this.articulos.length;i++){
       if(this.articulos[i].id==articuloSel._id){

         a= a + parseInt(this.articulos[i].cantidad);
         this.articulos[i]=({id: articuloSel._id
                           , nombre: articuloSel.nombre
                           , img: articuloSel.img
                           , precio: articuloSel.precio
                           , cantidad:a });
          i=this.articulos.length;
          bandera=1;
        }

      }

      if(bandera==0){
        this.articulos.push({id: articuloSel._id
                          , nombre: articuloSel.nombre
                          , img: articuloSel.img
                          , precio: articuloSel.precio
                          , cantidad:a })
      }

    }


		//this.count=this.articulos.length;
		localStorage['names']=JSON.stringify(this.articulos);
		var storedNames=JSON.parse(localStorage['names']);
		console.log(this.articulos);
		console.log('stored1',  (storedNames));



 }

}
