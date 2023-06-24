import { Component, OnInit} from '@angular/core';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { PlaceDetails ,Restaurant,placeDetailsExample,restaurantExample } from '../model';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  private key = 'AIzaSyAKs4xwjpdFmZUq1dc8wbUeEDrcH4a14lg'
  placeDetails!:PlaceDetails
  place!:Restaurant

  checkIcon = "../../assets/icons/check-mark.png"


  constructor(private generalSvc:SvcService,private serverSvc:ServerApiService) {

    this.place = generalSvc.restaurantSelectedToView
  }

  async ngOnInit() {
    
    const result = await this.serverSvc.getRestaurantDetails(this.place.placeId)

    this.placeDetails = result
    console.info('>>> place detail: ',this.placeDetails)
  }

  getGoogleMapUrl(placeId:string):string {
    const url = "https://www.google.com/maps/embed/v1/place?key=" + this.key +"&q=place_id:" + placeId
    return url
  }
}
