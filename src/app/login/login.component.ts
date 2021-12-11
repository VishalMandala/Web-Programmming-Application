import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  option = '';
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  optionSelected(value: string) {
    this.option = value;
  }

  resetOption() {
    this.option = '';
  }

  onSubmit(): void {
    let data = new Login();
    data = this.form;

    this.authService.login(data, this.option).subscribe(
      d => {
        this.tokenStorage.saveToken(d.accessToken);
        this.tokenStorage.saveUser(d);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        if (this.option == 'expert') {
          this.router.navigate(['profile'], { queryParams: { logged: true, role: 'expert' }});
        }
        else {
          this.router.navigate(['patient-dashboard'], { queryParams: { logged: true, role: 'patient' }});
        }

      },
      err => {
        
        this.errorMessage = err.error.error;
        console.log(err.error)
        this.isLoginFailed = true;
      }
    );
  }
}
