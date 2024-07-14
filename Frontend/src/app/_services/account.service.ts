import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  BaseURL = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.BaseURL+ '/account/login', data);
  }

  register(body: any): Observable<any>{
    return this.http.post<any>(this.BaseURL+ '/account/register', body )
  }

  logout(){
    localStorage.clear()
  }

  // isLoggedIn(): boolean {
  //     const user = localStorage.getItem('token');
  //     return !!user; // Convert to boolean
  // }
  isLoggedIn():  boolean {
    // Check if localStorage is defined (not null and not undefined)
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('token');
      return !!user; // Returns true if user is logged in
    }
    return false; // Return false if localStorage is not available
  }

  getToken(): string | null {
    return localStorage.getItem('token') || '';
  }

}
