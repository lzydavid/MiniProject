import { Component ,OnInit, ViewChild} from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { MatAccordion } from '@angular/material/expansion';
import { Region,Option } from '../model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocationDialogComponent } from './dialog/location-dialog.component';

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
      await this.apiSvc.getResultFromSearchNearBy(query,this.latitude,this.longitude).then(
        result=>{
          console.info('search result: ',result)
          this.svc.restaurants = result.results
          this.svc.nextPageToken = result.nextPageToken
        }
      ).then(
        ()=>{
          this.router.navigate(['/result'])
        }
      )

    }else{
      const query = this.form.value['query']
      const location = this.form.value['location'] || this.selectedLoc
      console.info('>>>Form '+ query + location)
      await this.apiSvc.getResultFromSearch(query,location).then(
        result=>{
          console.info('search result: ',result)
          this.svc.restaurants = result.results
          this.svc.nextPageToken = result.nextPageToken
        }
      ).then(
        ()=>{
          this.router.navigate(['/result'])
        }
      )
    }
  }

  createForm(){
    return this.fb.group({
      query:this.fb.control<string>('',[Validators.required]),
      location:this.fb.control<string>('')
    })
  }

   displayLocation(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.minWidth='500px'
    const dialogRef = this.matDialog.open(LocationDialogComponent,dialogConfig)
    dialogRef.afterClosed().subscribe(
      (loc) =>{
        this.selectedLoc = loc
        console.info(this.selectedLoc)
      }
    )
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

