import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent implements OnInit{

  tasks: any = [];
  selectedId = '';
  isLoading: boolean = false;

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.getTaskList();
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

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: (response: any) => {
        this.getTaskList();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
