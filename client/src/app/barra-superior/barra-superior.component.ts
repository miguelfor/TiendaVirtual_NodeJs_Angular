import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css'],
  providers: [UserService]
})
export class BarraSuperiorComponent implements OnInit {
  public title = 'app';
  public user:User;
  public identity;
  public token;
  public errorMessage;
  public count;
  //this.productsComponent.
  constructor(private _userService:UserService,private router: Router
            ,private productService: ProductService ) {

              this.count=this.productService.countCanasta();
  }

  ngOnInit() {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();


    //  this.count=this.productService.countCanasta();
  //  this.count=123;
    //console.log(this.identity);
      // console.log(this.token);
       if(!this.identity){
           this.router.navigate(['/']);
       }
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity=null;
    this.token=null;
    this.router.navigate(['/']);
  }

}
