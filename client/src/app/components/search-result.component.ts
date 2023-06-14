import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { Restaurant,restaurants } from '../model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit{

  restaurants!:Restaurant[]
  
  nextPageToken!:string

  constructor(private svc:SvcService,private router:Router) {}

  ngOnInit(): void {
    this.restaurants = restaurants
    // this.restaurants = this.svc.restaurants
    console.info(">>> search result"+ this.restaurants)
  }

  onSelect(r:Restaurant){
    console.info(r)
    this.svc.restaurantSelectedToView = r
    this.router.navigate(['/details'])
  }

  getIconArray(number: number): number[] {
    return Array(number).fill(0).map((_, index) => index + 1);
  }
}
