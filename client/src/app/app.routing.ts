import {ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

//import user
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
//import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCarritoComponent } from './product-carrito/product-carrito.component';

const appRoutes: Routes=[
 {path:'', component: LoginComponent},
 {path:'products', component: ProductsComponent},
 {path:'product-detail/:id', component: ProductDetailComponent},
 {path:'product-carrito', component: ProductCarritoComponent},
  {path:'barra-superior', component: BarraSuperiorComponent},
 {path:'**', component: LoginComponent},

];

export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);
