import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { Restaurant } from '../model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit{

  restaurants!:Restaurant[]
  nextPageToken!:string

  constructor(private generalSvc:SvcService,private apiSvc:ServerApiService,private router:Router) {}

  ngOnInit(): void {
    const FormValue = this.generalSvc.FormValue
    const query = FormValue['query']
    const location = FormValue['location']
    console.info('>>>form value'+query,location)

    this.apiSvc.getResultFromSearch(query,location).then(
      result=>{
        this.restaurants = result.results
        console.info(this.restaurants)

        this.nextPageToken = result.nextPageToken
        console.info(this.nextPageToken)
      }
    )
  }

  onSelect(placeId:string){
    console.info(placeId)
    this.generalSvc.placeId=placeId
    this.router.navigate(['/details'])
  }
}
