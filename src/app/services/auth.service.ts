import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { registerExpert, registerPatient } from '../models/register.model';

const AUTH_API = 'http://localhost:3000/connpsych/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: Login, role: string): Observable<any> {
    if (role == 'expert') {
      return this.http.post(AUTH_API + 'experts/signInForExpert', data);
    } else {
      return this.http.post(AUTH_API + 'users/signIn', data);
    }
  }

  contactUs(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'contactus', data);
  }

  resetPassword(token: any, password: any) {
    return this.http.post(AUTH_API + 'users/new-password/'+token, {password : password});
  }

  resetPasswordEmail(data: any) {
    return this.http.post(AUTH_API + 'users/reset-password', data);
  }

  registerPatient(data: registerPatient): Observable<any> {
    return this.http.post(AUTH_API + 'users/signUp', data);
  }

  registerExpert(data: registerExpert): Observable<any> {
    return this.http.post(AUTH_API + 'experts/signUpForExpert', data);
  }

  updatePatientProfile(id:any, data: any): Observable<any> {
    return this.http.patch(AUTH_API + 'users/'+id, data);
  }
  updateExpertProfile(id:any, data: any): Observable<any> {
    return this.http.patch(AUTH_API + 'experts/'+id, data);
  }
}
