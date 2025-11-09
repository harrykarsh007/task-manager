import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StrongPasswordRegx } from '../models/strongPassword';
import bcrypt from 'bcryptjs';
import { UserService } from '../services/user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(StrongPasswordRegx)
      ]),
      cpassword: new FormControl('', [Validators.required])
    },
    { validators: RegisterComponent.passwordMatchValidator }
  );

  today = new Date();
  latestUser: any;
  users = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  static passwordMatchValidator(control: AbstractControl) {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const cpassword = form.get('cpassword')?.value;
    return password === cpassword ? null : { mismatch: true };
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get dob() { return this.registerForm.get('dob'); }
  get password() { return this.registerForm.get('password'); }
  get cpassword() { return this.registerForm.get('cpassword'); }

  async signUp() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const password = this.registerForm.get('password')?.value!;
    const hash = await this.hashPassword(password);
    const formValue = this.registerForm.value;
    const email = this.registerForm.get('email')?.value!;
    const emailExists = await lastValueFrom(
      this.userService.isEmailTaken(email)
    );
    if (emailExists) {
      alert("Email already registered!");
      return;
    }
    const payload = {
      ...formValue,
      id: this.getNextUserId(this.latestUser.id),
      password: hash,
      verified: false,
      created_on: this.today
    };
    delete payload.cpassword;
    this.userService.createUser(payload).subscribe({
      next: (response: any) => {
        if(response){
          alert(`Registration Successful, Your User Id - ${response.id}`);
          this.router.navigate(['/login']);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  async hashPassword(plainPassword: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash;
  }

  async getUsers() {
    let nextId;
    this.userService.getUsers().subscribe({
      next: async (response: any) => {
        this.users = response;
        this.latestUser = response.sort((a: any, b: any) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime())[0];
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    return nextId;
  }

  private getNextUserId(lastId: string): string {
    const numberPart = parseInt(lastId.replace(/\D/g, ""), 10);
    const nextNumber = numberPart + 1;
    const prefix = lastId.replace(/[0-9]/g, "");
    return `${prefix}${nextNumber}`;
  }
  
}
