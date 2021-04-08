import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formModel = {
    FirstName:'',
    LastName:'',
    Email: '',
    Password: '',
  };
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    // this.userService.login(form.value, 'Login');
    // this.userService.login(form.value, 'Login');

    
    // .subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     if (res.data != null) {
    //       localStorage.setItem('token', res.data);
    //       localStorage.setItem('username', res.username);
    //       // this.userService.isAuth = true;
    //       localStorage.setItem('isAuth', 'true');
    //       console.log(this.userService.isAuth);
    //       this.router.navigate(['/dashboard']);
    //     } else {
    //       this.incorrect = true;
    //       this.incorrectMassege = 'Incorrect UserName Or Password';
    //       console.log('incorrect username Or Password');
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.incorrect = true;
    //     this.incorrectMassege = 'Incorrect UserName Or Password';
    //   }
    // );
  }
}
