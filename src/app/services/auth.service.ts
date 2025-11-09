import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { lastValueFrom } from 'rxjs';
import bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: any = null;

  constructor(private userService: UserService) {}

  async login(payload: any): Promise<boolean> {
    try {
      const users: any = await lastValueFrom(this.userService.getUsers());
      const foundUser = users.find(
        (u: any) => u.email.toLowerCase() === payload.email.toLowerCase()
      );
      if (!foundUser) {
        return false;
      }
      const passwordMatch = bcrypt.compareSync(payload.password, foundUser.password);
      if (!passwordMatch) {
        return false;
      }
      this.loggedInUser = foundUser;
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    } catch (err) {
      console.error('Login Error:', err);
      return false;
    }
  }

  // ✅ Logout
  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('user');
  }

  // ✅ Check login status
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // ✅ Get logged in user
  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }
}
