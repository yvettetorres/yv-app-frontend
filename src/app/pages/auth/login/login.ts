//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-login',
//  standalone: false,
//  templateUrl: './login.html',
//  styleUrl: './login.scss',
//})
//export class Login {}

//import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router } from '@angular/router';

//@Component({
  //selector: 'app-login',
  //standalone: false,
//  templateUrl: './login.html',
//  styleUrl: './login.scss'
//})
//export class Login implements OnInit {
  // 1. Solo declaras la propiedad y su tipo
 // loginForm!: FormGroup; 

 // constructor(private fb: FormBuilder, private router: Router) {}

//  ngOnInit(): void {
    // 2. La inicializas aquí, donde 'this.fb' ya existe al 100%
    //this.loginForm = this.fb.group({
    //  username: ['', [Validators.required]],
  //    password: ['', [Validators.required, Validators.minLength(3)]]
//    });
//  }

//  onLogin() {
//    this.router.navigate(['/home']);
//  }
//}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  // Solo declaramos el formulario aquí
  loginForm!: FormGroup; 

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    //  Lo inicializamos aquí dentro, donde 'this.fb' ya existe
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onLogin() {
    const { username, password } = this.loginForm.value;
    this.authSvc.login(username!, password!).subscribe();
  }
}
