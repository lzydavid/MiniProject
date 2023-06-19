import { Injectable } from '@angular/core';
import { Collection, Restaurant } from '../model';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';
import { ServerApiService } from './server-api.service';


@Injectable({
  providedIn: 'root'
})
export class SvcService {

  placeId!:string
  //lastest searched result
  restaurants!:Restaurant[]
  nextPageToken!:string
  
  restaurantSelectedToView!:Restaurant
  bookmarkedPlaces!:Restaurant[]
  userCollection!:Collection[]
  
  constructor() {}

  generateUUID():string{
    const shortUUID = uuidv4().replace(/-/g, '').substring(0, 8);
    return shortUUID;
  }


}
