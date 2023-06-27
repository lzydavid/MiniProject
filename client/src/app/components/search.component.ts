import { Component ,OnInit, ViewChild} from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { MatAccordion } from '@angular/material/expansion';
import { Region,Option } from '../model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form!:FormGroup
  selectedLoc!:string
  useCurrentLoc:boolean=false
  latitude!:string
  longitude!:string


  constructor(private fb:FormBuilder,private router:Router,private svc:SvcService,private apiSvc:ServerApiService,private matDialog:MatDialog) {}

  ngOnInit(): void {
    this.form = this.createForm()
    //console.info(this.svc.restaurants)
  }

  //store searched result in service
  async onSubmit(){
    if(this.useCurrentLoc){
      const query = this.form.value['query']
      const result = await this.apiSvc.getResultFromSearchNearBy(query,this.latitude,this.longitude)
      
      this.svc.restaurants = result.results
      this.svc.nextPageToken = result.nextPageToken

      await new Promise((resolve) => setTimeout(resolve, 0));

      console.info('>>> svc.res:',this.svc.restaurants)
      this.router.navigate(['/result'])        
     
    }else{
      const query = this.form.value['query']
      console.info('>>>Form '+ query)
      
      const result = await this.apiSvc.getResultFromSearch(query)
      this.svc.restaurants = result.results
      this.svc.nextPageToken = result.nextPageToken

      await new Promise((resolve) => setTimeout(resolve, 0));

      console.info('>>> svc.res:',this.svc.restaurants)

      

      this.router.navigate(['/result'])
    }
  }

  createForm(){
    return this.fb.group({
      query:this.fb.control<string>('',[Validators.required])
    })
  }

  toggleOption(){
    this.getCurrentLocation()
    this.useCurrentLoc=!this.useCurrentLoc
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude.toString()
          this.longitude = position.coords.longitude.toString()
          console.log('Latitude:', this.latitude);
          console.log('Longitude:', this.longitude);
        },
        (error) => {
          // Handle error in retrieving current position
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

}

