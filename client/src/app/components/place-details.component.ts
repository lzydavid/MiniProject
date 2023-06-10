import { Component, OnInit} from '@angular/core';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { PlaceDetails } from '../model';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  placeDetails!:PlaceDetails

  constructor(private generalSvc:SvcService,private serverSvc:ServerApiService) {}

  ngOnInit(): void {
    const placeId = this.generalSvc.placeId

    this.serverSvc.getRestaurantDetails(placeId).then(
      (result)=>{
        this.placeDetails=result
        console.info(this.placeDetails)
      }
    )
  }

}
