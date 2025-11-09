import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit {

  tasks: any = [];
  selectedId = '';
  isLoading: boolean = false;

  editForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    dueDate: new FormControl('', Validators.required),
    status: new FormControl('Accepted'),
    checked: new FormControl(false)
  });

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.getTaskList();
  }

  get title() {
    return this.editForm.get('title');
  }
  get desc() {
    return this.editForm.get('description');
  }
  get date() {
    return this.editForm.get('dueDate');
  }

  getTaskList(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        this.tasks = response;
        this.tasks.sort((a: any, b: any) => a.id - b.id);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  editTask(task: any): void {
    this.selectedId = task.id;
    this.editForm.patchValue(task);
  }

  onSubmit(): void {
    this.taskService.updateTask(this.editForm.value, this.selectedId).subscribe({
      next: (response: any) => {
        if(response) {
          this.selectedId = '';
          this.editForm.reset();
          this.getTaskList();
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
