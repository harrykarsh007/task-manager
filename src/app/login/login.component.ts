import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get remember() {
    return this.loginForm.get('remember');
  }

  auth(): void {
    this.authService.login(this.loginForm.value).then((res) => {
      if (res === true) {
        this.router.navigate(['/view']);
      } else {
        alert('Invalid email or password');
      }
    });
  }
  

}
