import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public apiURL: string = 'http://localhost:3000/user';
  public name$ = new BehaviorSubject(<string>'');
  constructor(private http: HttpClient) {}

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURL}/login`, user);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURL}/register`, user);
  }
}
