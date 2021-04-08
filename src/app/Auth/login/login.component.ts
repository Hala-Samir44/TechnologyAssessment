import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel= {
    Email:'test@test.com',
    Password:'test'
  } ;
  submitted = false;
  returnUrl: string|undefined;
  error = '';
  constructor(private route: ActivatedRoute,private router: Router,private authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/home']);
  }

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  onSubmit(form: NgForm) {

    this.submitted = true;

    // stop here if form is invalid
    // if (this.formModel.invalid) {
    //     return;
    // }

    this.authenticationService.login(form.value.Email, form.value.Password)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
            });

  }

}
