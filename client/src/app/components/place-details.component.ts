import { Component, OnInit, TemplateRef} from '@angular/core';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { Collection, PlaceDetails ,Restaurant } from '../model';
import { AuthService } from '../service/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateColDialogComponent } from './dialog/create-col-dialog.component';

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

  constructor(private generalSvc:SvcService,private serverSvc:ServerApiService,private authSvc:AuthService,private matdiaglog:MatDialog) {

    this.place = generalSvc.restaurantSelectedToView
    if(this.authSvc.isLoggedIn){
      this.isLoggedIn=true
    }

    if(generalSvc.userCollection!=null){
      this.collections=generalSvc.userCollection
    }else{
      this.collections = []
    }
    if(this.collections.length>0){
      this.collectionsEmpty=false
    }
  }

  async ngOnInit() {

    await this.serverSvc.getRestaurantDetails(this.place.placeId).then(
    result =>{

      this.placeDetails = result

      this.imgsliderImg.push(this.place.photoRef);
      for (let i = 0; i < this.placeDetails.photos.length; i++) {
      
        this.imgsliderImg.push(this.placeDetails.photos[i]);
      }
    }
   )
  }

  getGoogleMapUrl(placeId:string):string {
    const url = "https://www.google.com/maps/embed/v1/place?key=" + this.key +"&q=place_id:" + placeId
    return url
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.matdiaglog.open(CreateColDialogComponent,dialogConfig)

    dialogRef.afterClosed().subscribe(
      data =>{
        if(data){
          const name:string = data['colName']
          const newId = this.generalSvc.generateUUID() 
          const newCol:Collection = {colId:newId,collectionName:name,restaurants:[]}
          this.collections.push(newCol)
          this.collectionsEmpty= false
        }else{
          console.log('no new collection is created');
        }
      }
    )
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.matdiaglog.open(ref);
  }

  addToCollection(c:Collection){
    const idx = this.collections.findIndex(i => i.collectionName===c.collectionName)
    if(this.collections[idx].restaurants.find(i=>i.placeId===this.place.placeId)){
      alert('Already bookmarked')
    }else{
      this.collections[idx].restaurants.push(this.place)
    }
  }
}
