//import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

//import { LoginRoutingModule } from './login-routing-module';
//import { Login } from './login';

//@NgModule({
//  declarations: [Login],
//  imports: [CommonModule, LoginRoutingModule],
//})
//export class LoginModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing-module';
import { Login } from './login';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material-module';

@NgModule({
  declarations: [Login],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, MaterialModule]
})
export class LoginModule { }