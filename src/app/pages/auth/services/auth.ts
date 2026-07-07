//import { Service } from '@angular/core';

//@Service()
//export class Auth {}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { AuthResponse } from '../../../shared/models/auth.interface';
import { environment } from '../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = new BehaviorSubject<string>('');
  private tokenData = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.checkToken();
  }

  get token$(): Observable<string> {
    return this.token.asObservable();
  }

  get tokenData$(): Observable<any> {
    return this.tokenData.asObservable();
  }

  login(username: string, password: string): Observable<AuthResponse | void> {
    return this.http.post<AuthResponse>(`${environment.API_URL}/api/auth/login`, { username, password })
      .pipe(
        map((data: AuthResponse) => {
          if (data.token) {
            this.saveLocalStorage(data.token);
            this.token.next(data.token);
            this.router.navigate(['/home']);
          }
          return data;
        }),
        catchError(error => this.handlerError(error))
      );
  }

  saveLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    this.token.next('');
    this.tokenData.next(null);
    this.router.navigate(['/']);
  }

  checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token.next(token);
    } else {
      this.logout();
    }
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = 'Ocurrio un error';
    if (error.error) {
      errorMessage = `${error.error.message}`;
    }
    this.snackBar.open(errorMessage, '', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    return throwError(() => new Error(errorMessage));
  }
}