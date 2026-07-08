import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks';

enum Action { EDIT = 'edit', NEW = 'new' }

@Component({
  selector: 'app-tasks-dialog',
  standalone: false,
  templateUrl: './tasks-dialog.html',
  styleUrl: './tasks-dialog.scss'
})
export class TasksDialog implements OnInit {
  actionTODO = Action.NEW;
  titleButton = 'Guardar';
  taskForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TasksDialog>,
    private fb: FormBuilder,
    private tasksSvc: TasksService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [''],
      projectId: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['PENDING']
    });
    this.pathData();
  }

  pathData() {
    if (this.data?.task?.id) {
      this.actionTODO = Action.EDIT;
      this.titleButton = 'Editar';
      this.taskForm.patchValue({
        id: this.data.task.id,
        projectId: this.data.task.projectId,
        title: this.data.task.title,
        description: this.data.task.description,
        status: this.data.task.status
      });
    }
  }

  onSave() {
    if (this.taskForm.invalid) return;
    const formValues = this.taskForm.getRawValue();

    if (this.actionTODO === Action.NEW) {
      const newTask = {
        projectId: formValues.projectId,
        title: formValues.title,
        description: formValues.description
      };
      this.tasksSvc.newTask(newTask as any).subscribe((result: any) => {
        this.dialogRef.close(result);
      });
    } else {
      // ✅ CORREGIDO: NO enviamos el id en el body
      const updateTask = {
        title: formValues.title,
        description: formValues.description,
        status: formValues.status
      };
      
      const taskId = parseInt(formValues.id);
      
      console.log('📤 Actualizando tarea ID:', taskId);
      console.log('📦 Datos a enviar (sin id):', updateTask);
      
      this.tasksSvc.updateTask(taskId, updateTask).subscribe({
        next: (result) => {
          console.log('✅ Tarea actualizada:', result);
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('❌ Error al actualizar:', error);
        }
      });
    }
  }

  // ✅ El método onClear debe estar DENTRO de la clase
  onClear() {
    this.taskForm.reset();
  }
}