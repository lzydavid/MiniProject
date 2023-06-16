import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {lastValueFrom} from 'rxjs'
import { PlaceDetails, RegisterResult, UserAccount, UserLogin } from '../model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  private SERVER_API_URL = '/api'

  private headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");

  constructor(private httpClient:HttpClient) { }

  getResultFromSearch(query:string,location:string):Promise<any> {

    const url = this.SERVER_API_URL + '/search'

    const params = new HttpParams()
      .set('query',query)
      .set('location',location)

    return lastValueFrom(this.httpClient.get(url,{params}))
  }

  getRestaurantDetails(placeId:string):Promise<PlaceDetails> {

    const url = this.SERVER_API_URL + '/search/' + placeId

    return lastValueFrom(this.httpClient.get<PlaceDetails>(url))
  }

  registerNewAccount(form:FormGroup) :Promise<RegisterResult> {

    const url = this.SERVER_API_URL +'/register'

    const acc = {
      "id":'-',
      "firstName":form.value['firstName'],
      "lastName":form.value['lastName'],
      "email":form.value['email'],
      "password":form.value['password']
    } as UserAccount

    console.info(acc)

    const body = JSON.stringify(acc)

    return lastValueFrom(this.httpClient.post<RegisterResult>(url,body,{headers:this.headers}))
  }

  login(form:FormGroup):Promise<any> {

    const url = this.SERVER_API_URL + '/login'

    const login = {
      "email":form.value['email'],
      "password":form.value['password']
    } as UserLogin

    const body  = JSON.stringify(login)

    return lastValueFrom(this.httpClient.post<any>(url,body,{headers:this.headers}))
  }

  saveCollection() {
    
  }
}
