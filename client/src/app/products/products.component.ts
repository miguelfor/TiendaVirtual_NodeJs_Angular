import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';

import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';
import { Response } from '@angular/http';
import{Product} from '../models/product';
import { ProductService } from '../services/product.service';
import { CarShopingService } from '../services/car-shoping.service';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [UserService,ProductService]
})
export class ProductsComponent implements OnInit {
  /*//json manual
  articulos : any[] = [];
*/
  articulos : any[] = [];
  public products:Product[];
  articuloFilter: any = {nombre: ''};
  inputCantidad : string[]=['0'];
  public cantidadAdd;
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;
  public count=0;
    public migue="miguel frero";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private userService: UserService//,
  //  private carShopingService: CarShopingService
  ) {
    this.url = GLOBAL.url;
    this.identity=this.userService.getIdentity();
    this.token=this.userService.getToken();
    this.next_page=1;
    this.prev_page=1;

    this.count=this.productService.countCanasta();

   }

  ngOnInit() {
  //  this.count=this.productService.countCanasta();

    this.getProducts();
  //  this.products.subscribe(products => products.forEach(product => this.inputCantidad.push('1') ));
     /* // json manual
    this.articulos = [
  			{nombre: "Aguacate", img: "aguacate.jpg", precio: "5.00", stock: "46"},
  			{nombre: "Ajo", img: "ajo.jpg", precio: "2.00", stock: "75"},
  			{nombre: "Almendras", img: "almendras.jpg", precio: "6.00", stock: "28"},
  			{nombre: "Arándanos", img: "arandanos.jpg", precio: "6.00", stock: "39"},
  			{nombre: "Brócoli", img: "brocoli.png", precio: "3.00", stock: "45"},
  			{nombre: "Calabaza", img: "calabaza.jpg", precio: "6.00", stock: "40"},
  			{nombre: "Canela", img: "canela.jpg", precio: "2.00", stock: "20"},
  			{nombre: "Cebolla", img: "cebolla.jpg", precio: "4.00", stock: "30"},
  			{nombre: "Fresa", img: "fresa.jpg", precio: "2.00", stock: "50"},
  			{nombre: "Kiwi", img: "kiwi.jpg", precio: "3.00", stock: "36"},
  			{nombre: "Limón", img: "limon.jpg", precio: "1.50", stock: "70"},
  			{nombre: "Lychee", img: "lychee.jpg", precio: "5.00", stock: "80"},
  			{nombre: "Maiz", img: "maiz.jpg", precio: "2.50", stock: "40"},
  			{nombre: "Manzana", img: "manzana.jpg", precio: "3.40", stock: "39"},
  			{nombre: "Naranja", img: "naranja.jpg", precio: "3.00", stock: "60"},
  			{nombre: "Papa", img: "papa.jpg", precio: "3.50", stock: "60"},
  			{nombre: "Pasta", img: "pasta.jpg", precio: "2.50", stock: "47"},
  			{nombre: "Pimienta", img: "pimienta.jpg", precio: "3.80", stock: "70"},
  			{nombre: "Repollo", img: "repollo.jpg", precio: "4.50", stock: "67"},
  			{nombre: "Tomate", img: "tomate.jpg", precio: "2.80", stock: "78"},
  			{nombre: "Zanahoria", img: "zanahoria.jpg", precio: "1.80", stock: "58"}
  		]*/
  }

getProducts(){
  this.route.params.forEach((params:Params)=>{
    let page= +params['page'];
    if(!page){
      page=1;
    }else{
      this.next_page= page+1;
      this.prev_page= page-1;
      if(this.prev_page==0){
        this.prev_page=1;
      }

    }
    this.productService.getProducts(this.token,page).subscribe(
      response=>{
        if(!response.products){
          this.router.navigate(['/']);
        }else{
          this.products = response.products;
        }
      },
      error=>{
        var errorMessage =<any>error;

        if(errorMessage != null){
          var body = JSON.parse(error.body);
          console.log(error);
        }
      }
    )

  });
}


 addCanasta(articuloSel,a) {
   this.productService.addCanasta(articuloSel,a);
   this.count=this.productService.countCanasta();
   this.router.navigate(['/']);

}




}
