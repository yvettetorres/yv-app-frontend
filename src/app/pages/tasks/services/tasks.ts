import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/tasks`, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handlerError(error)));
  }

  newTask(task: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/tasks`, task, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handlerError(error)));
  }

  // ✅ CORREGIDO: Acepta 2 parámetros (id y task)
  updateTask(id: number, task: any): Observable<any> {
    console.log('📤 Enviando PATCH a:', `${environment.API_URL}/tasks/${id}`);
    console.log('📦 Datos (sin id):', task);
    return this.http.patch<any>(`${environment.API_URL}/tasks/${id}`, task, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handlerError(error)));
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/tasks/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handlerError(error)));
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    if (error.error) errorMessage = `Error: ${error.error.message}`;
    this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
    return throwError(() => new Error(errorMessage));
  }
}