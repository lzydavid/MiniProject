import { Injectable } from '@angular/core';
import { UserAccount, UserCredentials } from '../model';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { SvcService } from './svc.service';
import { ServerApiService } from './server-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn:boolean = false
  currentUser!:UserAccount|null

  // private SERVER_API_URL = 'https://elastic-self-production.up.railway.app/api'
  private SERVER_API_URL = '/api'
  private headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
  
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private httpClient:HttpClient,private svc:SvcService,private apiSvc:ServerApiService) { }

  public updateLoggedStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  //login and get user details and bookmarks
  async login(credentials:UserCredentials) {

    const url = this.SERVER_API_URL + '/login'

    const body  = JSON.stringify(credentials)

    //get token from server and store in localstorage
    try{
      const resp = await lastValueFrom(this.httpClient.post<any>(url,body,{headers:this.headers}))
      const status:boolean = resp.status
      console.info('login status',status)
      if(status===true){
        const token = resp.token
        localStorage.setItem('token',token)
        this.isLoggedIn=true
        this.updateLoggedStatus(this.isLoggedIn)
      }
    }
    catch(error){
      if (error instanceof HttpErrorResponse) {
        const errorMessage = error.error.error; // Access the specific error message
        return errorMessage
      }
    }

    if(this.isLoggedIn=true){
      //get user info
      await this.getCurrentUserInfo().then(
        (data) =>{
          //update current user
          this.currentUser = data.account
        }
      )

      //get user collection
      await this.apiSvc.getUserCollections(this.currentUser!.id).then(
        (col)=>{
          this.svc.userCollection=col
        }
      )
    }

    console.info('After login success:',this.currentUser,this.svc.userCollection)
    return 'Login Success!'
  } 

  getCurrentUserInfo():Promise<any>{

    const url = this.SERVER_API_URL + '/acc'

    return firstValueFrom(this.httpClient.get<any>(url))
  }
}
