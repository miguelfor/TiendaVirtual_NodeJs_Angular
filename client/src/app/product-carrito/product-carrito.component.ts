import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';
import { Response } from '@angular/http';
import { ProductService } from '../services/product.service';
import{Product} from '../models/product';

@Component({
  selector: 'product-carrito',
  templateUrl: './product-carrito.component.html',
  styleUrls: ['./product-carrito.component.css']
})
export class ProductCarritoComponent implements OnInit {
  public count;
  public carrito;
  public total;
  public identity;
  public token;
  public url: string;
  public products:Product[];
  constructor(    private route: ActivatedRoute,
      private router: Router,
      private productService: ProductService,
      private userService: UserService) {
    this.url = GLOBAL.url;
    this.identity=this.userService.getIdentity();
    this.token=this.userService.getToken();
    this.count=this.productService.countCanasta();
    this.products=this.productService.getCarrito();
    this.total=this.productService.getTotal();
    console.log(this.carrito);

  }

  ngOnInit() {
  }
carritoCancelar(){
  this.productService.carritoCancelar();
  this.router.navigate(['/']);
}

carritoPagar(){
  this.productService.carritoPagar(this.token);
  this.router.navigate(['/']);
}



}
