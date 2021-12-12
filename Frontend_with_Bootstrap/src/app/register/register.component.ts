import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login.model';
import { registerPatient, registerExpert } from '../models/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  patientForm: any = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    age: null,
    gender: null,
    city: null,
    state: null
  };
  expertForm: any = {
    name: null,
    email: null,
    password: null,
    qualification: null,
    status: null,
    specialization: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  option = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  optionSelected(value: string) {
    this.option = value;
  }

  resetOption() {
    this.option = '';
  }

  onSubmit(): void {
    if (this.option == 'expert') {
      let data = new registerExpert();
      data = this.expertForm;

      this.authService.registerExpert(data).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['login']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    } else {
      let data = new registerPatient();
      data = this.patientForm;

      this.authService.registerPatient(data).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['login']);
        },
        err => {
          this.errorMessage = err.error.error;
          this.isSignUpFailed = true;
        }
      );
    }
  }
}
