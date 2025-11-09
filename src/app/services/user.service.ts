import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users: any) => 
        users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())
      )
    );
  }
}
