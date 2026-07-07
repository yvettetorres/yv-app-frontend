import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDialog } from './tasks-dialog';

describe('TasksDialog', () => {
  let component: TasksDialog;
  let fixture: ComponentFixture<TasksDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
