import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { User } from './models/user';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService,ProductService]
})
export class AppComponent   {
  public title = 'app';
  public user:User;
  public identity;
  public token;
  public errorMessage;



  constructor(
  	private _userService:UserService,  public productService: ProductService
  ){
  this.user=new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();

   console.log(this.identity);
    // console.log(this.token);
  }

}
