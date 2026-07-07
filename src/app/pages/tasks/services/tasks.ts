import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { TaskResponse, DefaultResponse } from '../../../shared/models/task.interface';
import { environment } from '../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${environment.API_URL}/tasks`, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handlerError(error)));
  }

  newTask(task: TaskResponse): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${environment.API_URL}/tasks`, task, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handlerError(error)));
  }

  updateTask(task: TaskResponse): Observable<DefaultResponse> {
    return this.http.patch<DefaultResponse>(`${environment.API_URL}/tasks/${task.projectId}`, task, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handlerError(error)));
  }

  deleteTask(id: number): Observable<DefaultResponse> {
    return this.http.delete<DefaultResponse>(`${environment.API_URL}/tasks/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handlerError(error)));
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = 'Ocurrio un error';
    if (error.error) errorMessage = `Error: ${error.error.message}`;
    this.snackBar.open(errorMessage, '', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
    return throwError(() => new Error(errorMessage));
  }
}