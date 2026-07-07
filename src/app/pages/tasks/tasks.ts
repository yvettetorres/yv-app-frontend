import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService } from './services/tasks'; //  Corregido: sin '.service'
import { TaskResponse } from '../../shared/models/task.interface';
import { TasksDialog } from './components/tasks-dialog/tasks-dialog';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
}) // Decorador perfectamente asociado a la clase Tasks
export class Tasks implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'actions'];
  tasks = new MatTableDataSource<TaskResponse>();

  constructor(
    private tasksSvc: TasksService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.tasksSvc.getTasks().subscribe((tasks: TaskResponse[]) => {
      console.log('MIS TAREAS DETALLADAS:', tasks);
      this.tasks.data = tasks;
      this.tasks._updateChangeSubscription(); // Actualiza la tabla después de asignar los datos
      this.cdRef.detectChanges();
    });
  }

  onOpenModal(task: any = {}) {
    const dialogRef = this.dialog.open(TasksDialog, {
      minWidth: '60%',
      data: { title: 'Registro de Tareas', task }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.snackBar.open(result.message, '', {
          duration: 5000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.listar();
      }
    });
  }

onDelete(id: number) {
    Swal.fire({
      title: '',
      text: '¿Realmente desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkBlue',
      cancelButtonColor: 'lightBlue', // Mantenemos tu color original
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasksSvc.deleteTask(id).subscribe((res: any) => {
          this.snackBar.open(res.message, '', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          
          // Envolvemos el listar en este setTimeout para darle un respiro de 300ms al backend
          setTimeout(() => {
            this.listar();
          }, 300);

        });
      }
    });
  }

  onLogout() {
    // Aquí borras los datos de sesión si usas localStorage
    localStorage.clear(); 
    // Y fuerzas un redireccionamiento o recarga al login
    window.location.href = '/auth/login'; 
  }

}