import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthRouteGuardService } from './services/auth-route-guard.service';
import { TodoComponent } from './todos/todo/todo.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthRouteGuardService] },
  { path: 'todos', component: TodosComponent, canActivate: [AuthRouteGuardService] },
  { path: 'todos/new', component: TodoComponent, canActivate: [AuthRouteGuardService] },
  { path: 'todos/:id', component: TodoComponent, canActivate: [AuthRouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthRouteGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
