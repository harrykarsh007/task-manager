import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {

  taskForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    dueDate: new FormControl('', [Validators.required]),
    status: new FormControl('Accepted'),
    checked: new FormControl(false)
  });

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.setTaskIdValue();
  }

  get title() {
    return this.taskForm.get('title');
  }
  get desc() {
    return this.taskForm.get('description');
  }
  get date() {
    return this.taskForm.get('dueDate');
  }
  

  setTaskIdValue(): void {
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        if (response) {
          let count = 1001;
          const mapArr = response.map((val: any) => Number(val.id));
          mapArr.sort().forEach(()=> {
            count++;
            if(!mapArr.includes(count)){
              const nextTaskId = count.toString();
              this.taskForm.controls.id.setValue(nextTaskId);
            }
          }); 
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onSubmit(): void {
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: (response: any) => {
        if(response){
          this.taskForm.reset();
          this.router.navigate(['/view']);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
