import { Component, OnInit,OnDestroy, TemplateRef, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { Collection, Restaurant,restaurants } from '../model';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateColDialogComponent } from './dialog/create-col-dialog.component';
import { AuthService } from '../service/auth.service';
import {  } from '@angular/cdk/scrolling'


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy{

  userId!:string
  restaurants!:Restaurant[] //search result
  nextPageToken!:string
  collections!:Collection[]
  isLoggedIn:boolean=false

  constructor(private svc:SvcService,private router:Router,private matdiaglog:MatDialog, private authSvc:AuthService,private apiSvc:ServerApiService) {
    this.collections=[]
    //this.userId = authSvc.currentUser.id
  }

  ngOnInit(): void {

    // this.restaurants = this.svc.restaurants
    this.restaurants = restaurants
    
    if(this.authSvc.isLoggedIn){
      this.collections=this.svc.userCollection
      this.isLoggedIn=true
    }
  }

  onSelect(r:Restaurant){
    console.info(r)
    this.svc.restaurantSelectedToView = r
    this.router.navigate(['/details'])
  }

  //create new collection
  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.matdiaglog.open(CreateColDialogComponent,dialogConfig)

    dialogRef.afterClosed().subscribe(
      data =>{
        const name:string = data['colName']
        const newId = this.svc.generateUUID() 
        // const newCol:Collection = {collectionName:name,restaurants:[]}
        const newCol:Collection = {colId:newId,collectionName:name,restaurants:[]}
        this.collections.push(newCol)
        console.info(this.collections)
      }
    )
  }

  addToCollection(c:Collection,r:Restaurant){
    const idx = this.collections.findIndex(i => i.collectionName===c.collectionName)
    if(this.collections[idx].restaurants.find(i=>i.placeId===r.placeId)){
      console.info('already in collection')
    }else{
      this.collections[idx].restaurants.push(r)
    }
    console.info(this.collections)
  }

  //update the collection when leaving page
  ngOnDestroy(): void {
    //update and save the current collection
    this.svc.userCollection=this.collections

    if(this.authSvc.isLoggedIn){
      //this.apiSvc.saveCollection()
    }
  }

  save(){
    //this.apiSvc.saveCollection()
  }
  
  openDialogWithRef(ref: TemplateRef<any>) {
    this.matdiaglog.open(ref);
  }
}
