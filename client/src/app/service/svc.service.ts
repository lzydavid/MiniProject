import { Injectable } from '@angular/core';
import { Collection, Restaurant } from '../model';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class SvcService {

  FormValue!:any
  placeId!:string
  restaurants!:Restaurant[]
  nextPageToken!:string
  restaurantSelectedToView!:Restaurant
  bookmarkedPlaces!:Restaurant[]
  userCollection!:Collection[]
  
  constructor() { }

  generateUUID():string{
    const shortUUID = uuidv4().replace(/-/g, '').substring(0, 8);
    return shortUUID;
  }
}
