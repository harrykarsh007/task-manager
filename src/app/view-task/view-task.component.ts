import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent implements OnInit{

  tasks: any = [];
  isLoading: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (response: Task) => {
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

}
