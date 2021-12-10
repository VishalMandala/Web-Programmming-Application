import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/connpsych/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getExperts(): Observable<any> {
    return this.http.get(API_URL + 'experts/');
  }

  getExpert(id: any): Observable<any> {
    return this.http.get(API_URL + 'experts/'+id);
  }

  getUser(id: any): Observable<any> {
    return this.http.get(API_URL + 'users/'+id);
  }
}
