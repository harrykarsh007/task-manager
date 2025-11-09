import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly url = 'http://localhost:3000/tasks/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task> {
    return this.http.get<Task>(this.url);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<Task>(this.url, task);
  }

  updateTask(data: any, id: string): Observable<any> {
    return this.http.put(this.url + `${id}`, data);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(this.url+`${id}`);
  }
}
