import { Component, OnInit} from '@angular/core';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { Collection, PlaceDetails ,Restaurant,placeDetailsExample,restaurantExample } from '../model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  private key = 'AIzaSyAKs4xwjpdFmZUq1dc8wbUeEDrcH4a14lg'
  placeDetails!:PlaceDetails
  place!:Restaurant
  collections!:Collection[]
  isLoggedIn:boolean=false
  collectionsEmpty:boolean=true

  imgsliderImg:string[] = []

  checkIcon = "../../assets/icons/check-mark.png"

  constructor(private generalSvc:SvcService,private serverSvc:ServerApiService,private authSvc:AuthService) {

    this.place = generalSvc.restaurantSelectedToView
  }

  ngOnInit() {

    console.info('place detail place id: ',this.place.placeId)
    
    this.serverSvc.getRestaurantDetails(this.place.placeId).then(
    result =>{

      console.info('place detail result: ',result)
      this.placeDetails = result
      console.info('place detail details: ',this.placeDetails)

      this.imgsliderImg.push(this.place.photoRef);
      for (let i = 0; i < this.placeDetails.photos.length; i++) {
      
        this.imgsliderImg.push(this.placeDetails.photos[i]);
      }

      console.info('>>> place detail oninit: ',this.place,this.placeDetails,this.imgsliderImg)
    }
   )
  }

  getGoogleMapUrl(placeId:string):string {
    const url = "https://www.google.com/maps/embed/v1/place?key=" + this.key +"&q=place_id:" + placeId
    return url
  }
}
