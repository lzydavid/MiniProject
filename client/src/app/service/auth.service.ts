import { Injectable } from '@angular/core';
import { UserAccount, UserCredentials } from '../model';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SERVER_API_URL = '/api'
  private headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
  
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  isLoggedIn:boolean = false
  currentUser!:UserAccount

  constructor(private httpClient:HttpClient) { }

  public updateLoggedStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  login(credentials:UserCredentials):Promise<any> {

    const url = this.SERVER_API_URL + '/login'

    const body  = JSON.stringify(credentials)

    return lastValueFrom(this.httpClient.post<any>(url,body,{headers:this.headers}))
      .then(
        resp =>{
          const token = resp.token
        }
      )
  }  
}
