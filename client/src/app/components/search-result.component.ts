import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { Collection, Restaurant,restaurants } from '../model';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateColDialogComponent } from './dialog/create-col-dialog.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit{

  restaurants!:Restaurant[]
  nextPageToken!:string
  collectionsName:string[]=['Favourite','Want to try','Saved for later']
  collections!:Collection[]

  constructor(private svc:SvcService,private router:Router,private matdiaglog:MatDialog) {
    this.collections=[]
  }

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

  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.matdiaglog.open(CreateColDialogComponent,dialogConfig)

    dialogRef.afterClosed().subscribe(
      data =>{
        const name:string = data['colName'] 
        const newCol:Collection = {collectionName:name,restaurants:[]}
        this.collections.push(newCol)
        console.info(this.collections)
      }
    )
  }

  addToCollection(collectionName:string){
    console.info(collectionName)
  }
}
