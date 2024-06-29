import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  BaseURL = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post<any>(this.BaseURL+ '/account/login', body ).pipe(
    )
  }

  register(body: any) {
    return this.http.post<any>(this.BaseURL+ '/account/register', body )
  }

  logout(){
    localStorage.clear()
  }


  isLoggedIn(): boolean {
      const user = localStorage.getItem('token');
      return !!user; // Convert to boolean
  }

}
