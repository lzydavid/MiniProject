import { Injectable } from '@angular/core';
import { Collection, Restaurant } from '../model';

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
}
