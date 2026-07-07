//import { TestBed } from '@angular/core/testing';
//import { CanActivateFn } from '@angular/router';

//import { checkLoginGuard } from './check-login-guard';

//describe('checkLoginGuard', () => {
//  const executeGuard: CanActivateFn = (...guardParameters) =>
//    TestBed.runInInjectionContext(() => checkLoginGuard(...guardParameters));

//  beforeEach(() => {
//    TestBed.configureTestingModule({});
//  });

//  it('should be created', () => {
//    expect(executeGuard).toBeTruthy();
//  });
//});

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../../pages/auth/services/auth'; // 👈 Ruta corregida aquí

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authSvc.token$.pipe(
      take(1),
      map(token => {
        if (token === '') {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
