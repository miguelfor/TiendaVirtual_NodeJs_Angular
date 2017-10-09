import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title = 'app';
  public user:User;
  public identity;
  public token;
  public errorMessage;

  constructor(
  	private _userService:UserService,private router: Router
  ){
  this.user=new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){

    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();

  //console.log(this.identity);
    // console.log(this.token);
     if(this.identity){
         this.router.navigate(['/products']);
     }
  }

  public onSubmit(){
    //console.log(this.user);

    this._userService.signup(this.user).subscribe(
      response =>{
      let identity = response.user;
      this.identity= identity;
        //console.log(response);
        if(!this.identity._id){
          alert("el usuario no esta correctamente identificado")
        }else{
          //crear elemento en le localstorage
          localStorage.setItem('identity',JSON.stringify(identity));
                this._userService.signup(this.user, 'true' ).subscribe(
                  response =>{
                  let token = response.token;
                  this.token= token;
                    if(this.token <= 0){
                      alert("el token no se ha generado");
                    }else{
                      //crear elemento en le localstorage para tener eltoken disponible
                      localStorage.setItem('token',token);
                      this.user=new User('','','','','','ROLE_USER','');
                          this.router.navigate(['/products']);

                      //conseguir el token

                    }
                  },
                  error =>{
                    var errorMessage=<any>error;

                    if(errorMessage != null){
                    var body=JSON.parse(error._body);
                    this.errorMessage=body.message;;
                     console.log(error);
                    }
                  }
                );
          //conseguir el token

        }
      },
      error =>{
        var errorMessage=<any>error;

        if(errorMessage != null){
        var body=JSON.parse(error._body);
        this.errorMessage=body.message;;
         console.log(error);
        }
      }
    );
  }

}
