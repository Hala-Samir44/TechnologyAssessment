import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from './helper/auth.guard';
import { HomeComponent } from './home/home.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', component: LoginComponent },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        component: DashBoardComponent,
        children: [
          {
            path: 'home',
            component: HomeComponent, 
            canActivate: [AuthGuard] 
          },
          {
            path: 'allStudentsDetails/:isAll',
            component: HomeComponent,
            canActivate: [AuthGuard] 
          },
          {
            path: 'studentDetail/:id',
            component: StudentDetailComponent,
            canActivate: [AuthGuard] 
          },

        ]
      },
    ],
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
