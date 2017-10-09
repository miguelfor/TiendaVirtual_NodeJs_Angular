import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';
import { Response } from '@angular/http';
import { ProductService } from '../services/product.service';
import{Product} from '../models/product';

/*import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';
import { Response } from '@angular/http';
import{Product} from '../models/product';
import { ProductService } from '../services/product.service';
*/

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [UserService,ProductService]
})
export class ProductDetailComponent implements OnInit {
  /*//json manual
  articulos : any[] = [];
*/
  public product:Product;
  articuloFilter: any = {nombre: ''};
  cantidadAdd;
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
        private productService: ProductService,
    private userService: UserService
  ) {
    this.url = GLOBAL.url;
    this.identity=this.userService.getIdentity();
    this.token=this.userService.getToken();
    this.next_page=1;
    this.prev_page=1;
   }

  ngOnInit() {
     console.log("artist list component");
     this.getProduct();
  }
getProduct(){
  // console.log("artist list componentddddddddddddddd");

this.route.params.forEach((params:Params)=>{
  let id=params['id'];

  this.productService.getProductsId(this.token,id).subscribe(
    response=>{
      if(!response.product){
        this.router.navigate(['/']);
      }else{
        this.product = response.product;
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



}
