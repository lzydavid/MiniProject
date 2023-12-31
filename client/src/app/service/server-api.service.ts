import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {firstValueFrom, lastValueFrom} from 'rxjs'
import { Collection, PlaceDetails, RegisterResult, UserAccount } from '../model';
import { SvcService } from './svc.service';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  private SERVER_API_URL = 'https://elastic-self-production.up.railway.app/api'
  // private SERVER_API_URL = '/api'

  private headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");

  constructor(private httpClient:HttpClient,private svc:SvcService) {
    
   }

  getResultFromSearch(query:string):Promise<any> {

    const url = this.SERVER_API_URL + '/search'

    const params = new HttpParams()
      .set('query',query)

    return lastValueFrom(this.httpClient.get(url,{params}))
  }

  getResultFromSearchNearBy(query:string,latitude:string,longitude:string):Promise<any> {

    const url = this.SERVER_API_URL + '/searchnearby'

    const params = new HttpParams()
      .set('query',query)
      .set('Latitude',latitude)
      .set('Longitude',longitude)

    return lastValueFrom(this.httpClient.get(url,{params}))
  }

  getResultFromSearchWithToken(pagetoken:string):Promise<any> {

    const url = this.SERVER_API_URL + '/search/nextpage'

    const params = new HttpParams()
      .set('pagetoken',pagetoken)

    return lastValueFrom(this.httpClient.get(url,{params}))
  }

  getRestaurantDetails(placeId:string):Promise<PlaceDetails> {

    const url = this.SERVER_API_URL + '/search/' + placeId

    return firstValueFrom(this.httpClient.get<PlaceDetails>(url))
  }

  registerNewAccount(newUserAcc:UserAccount) :Promise<RegisterResult> {

    const url = this.SERVER_API_URL + '/register'

    const body = JSON.stringify(newUserAcc)

    return lastValueFrom(this.httpClient.post<RegisterResult>(url,body,{headers:this.headers}))
  }

  updateUserAccount(userAccount:UserAccount):Promise<any> {

    const url = this.SERVER_API_URL + '/update'

    const body = JSON.stringify(userAccount)

    return firstValueFrom(this.httpClient.put(url,body,{headers:this.headers}))
  }

  getUserCollections(userId:string):Promise<Collection[]>{
    
    const params = new HttpParams()
      .set('id',userId)
    const url = this.SERVER_API_URL + '/col'

    return lastValueFrom(this.httpClient.get<Collection[]>(url,{params}))
  }

  saveCollection(userId:string) {
    const url = this.SERVER_API_URL + '/save'
    const params = new HttpParams().set("id",userId)
    const body = JSON.stringify(this.svc.userCollection)

    return lastValueFrom(this.httpClient.post<any>(url,body,{headers:this.headers,params}))
  }
}
