import { Routes } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'view', component: ViewTaskComponent, canActivate: [AuthGuard] },
    { path: 'create', component: CreateTaskComponent, canActivate: [AuthGuard] },
    { path: 'update', component: UpdateTaskComponent, canActivate: [AuthGuard] },
    { path: 'delete', component: DeleteTaskComponent, canActivate: [AuthGuard] },
];
