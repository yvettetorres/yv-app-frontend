import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks';
import { TaskResponse } from '../../../../shared/models/task.interface';

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
      const updateTask = {
        id: parseInt(formValues.id),
        projectId: formValues.projectId,
        title: formValues.title,
        description: formValues.description,
        status: formValues.status
      };
      this.tasksSvc.updateTask(updateTask as any).subscribe((result: any) => {
        this.dialogRef.close(result);
      });
    }
  }

  onClear() {
    this.taskForm.reset();
  }
}