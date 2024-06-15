import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  BaseURL = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  PostMethod(url:string, body:any): Observable<any>{
    return this.http.post(this.BaseURL + url, body);
  }
  PutMethod(url:string, body:any): Observable<any>{
    return this.http.put(this.BaseURL + url, body);
  }
  GetMethod(url:string): Observable<any>{
    return this.http.get(this.BaseURL + url)
  }
  DeleteMethod(url:string): Observable<any>{
    return this.http.delete(this.BaseURL + url);
  }

}
