//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-header',
//  standalone: false,
//  templateUrl: './header.html',
//  styleUrl: './header.scss',
//})
//export class Header {}

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../pages/auth/services/auth'; 

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  data: any = {};

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.tokenData$.subscribe((data: any) => {
      this.data = data;
    });
  }

  onLogout() {
    this.authSvc.logout();
    this.data = null;
  }
}
