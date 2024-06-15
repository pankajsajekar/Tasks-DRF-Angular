import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  BaseURL = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.BaseURL+ '/account/login', { username , password })
  }

}
