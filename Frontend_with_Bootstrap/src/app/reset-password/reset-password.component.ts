import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  form: any = {
    password: null,
    confirmPassword: null
  };
  emailForm: any = {
    email: null
  };
  success = false;
  logged = false;
  unsub: any;
  unsub2:any;
  role?: string;
  token?: null;

  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unsub = this.activeRoute.queryParams.subscribe(params => {
      this.logged = params['logged'];
      this.role = params['role'];
      // this.token = params['token'];
    });

    this.unsub2 = this.activeRoute.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  goToHome() {
    this.router.navigate(['home'], {
      queryParams: { logged: this.logged, role: this.role },
    });
  }

  onEmailSubmit(): void {
    const data = this.emailForm;

    this.authService.resetPasswordEmail(data).subscribe(
      (d) => {
        window.alert('Your request submitted successfully! Please check your Mail!');
        this.router.navigate(['login'], {
          queryParams: { logged: this.logged, role: this.role },
        });
      },
      (err) => {
        window.alert('Your request Failed, please check the information entered and resubmit!');
      }
    );
  }

  onSubmit(): void {
    const data = this.form;
    if(data.password != data.confirmPassword) {
      window.alert("Confirm Password is different than New password!")
      return;
    }

    this.authService.resetPassword(this.token, data.password).subscribe(
      (d) => {
        window.alert('Your request submitted successfully!');
        this.router.navigate(['login'], {
          queryParams: { logged: this.logged, role: this.role },
        });
      },
      (err) => {
        window.alert('Your request Failed, please check the information entered and resubmit!');
      }
    );
  }
}
