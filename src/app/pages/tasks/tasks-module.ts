import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material-module';
import { Tasks } from './tasks';
import { TasksDialog } from './components/tasks-dialog/tasks-dialog';

@NgModule({
  declarations: [Tasks, TasksDialog],
  imports: [CommonModule, TasksRoutingModule, ReactiveFormsModule, MaterialModule]
})
export class TasksModule { }

