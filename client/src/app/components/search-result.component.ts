import { Component, OnInit,OnDestroy, TemplateRef,ViewChild,AfterViewInit,ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { Collection, Restaurant,restaurants } from '../model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateColDialogComponent } from './dialog/create-col-dialog.component';
import { AuthService } from '../service/auth.service';
import { CdkVirtualScrollViewport , VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling'
import { async, from } from 'rxjs';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy,AfterViewInit{

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  itemSize = 200

  userId!:string
  restaurants!:Restaurant[] //search result
  sortedRestaurants!: Restaurant[];

  nextPageToken:string|null = null
  collections!:Collection[]
  isLoggedIn:boolean=false

  filterRatingInc:boolean|undefined
  filterPriceLvlInc:boolean|undefined

  constructor(private svc:SvcService,private router:Router,private matdiaglog:MatDialog, private authSvc:AuthService,private apiSvc:ServerApiService,private cdr:ChangeDetectorRef) {
    this.collections=[]
    //this.userId = authSvc.currentUser.id
  }

  ngOnInit(): void {

    // this.restaurants = this.svc.restaurants
    this.nextPageToken = this.svc.nextPageToken
    this.restaurants = restaurants
    this.sortedRestaurants = [...this.restaurants]
    if(this.authSvc.isLoggedIn){
      this.collections=this.svc.userCollection
      this.isLoggedIn=true
    }
  }

  ngAfterViewInit() {

    // let isQuerying = false;

    // this.viewport.elementScrolled().subscribe(
    //   async ()=> {
    //     var items = this.viewport.getDataLength()
    //     var end = this.viewport.getRenderedRange().end
    //     console.info('result size', items,'viewport end:',end)
    //     if(!isQuerying && end>=items && this.nextPageToken){
    //       isQuerying = true;

    //       const result = await this.apiSvc.getResultFromSearchWithToken(this.nextPageToken)
    //       const moreRes:Restaurant[] = result.results
    //       this.restaurants = this.restaurants.concat(moreRes)

    //       items+=this.restaurants.length
              
    //       if(result.nextPageToken){
    //         this.nextPageToken = result.nextPageToken
    //       }else{
    //         this.nextPageToken = null
    //       }
    //     }
    //     this.cdr.detectChanges()
    //   }
    // )
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
  async ngOnDestroy() {
    //update and save the current collection
    this.svc.userCollection=this.collections

    if(this.authSvc.isLoggedIn){
      await this.apiSvc.saveCollection(this.authSvc.currentUser.id)
    }
  }

  save(){
    this.apiSvc.saveCollection(this.authSvc.currentUser.id)
  }
  
  openDialogWithRef(ref: TemplateRef<any>) {
    this.matdiaglog.open(ref);
  }

  toggleRating() {

    if (this.filterRatingInc === null) {
      this.filterRatingInc = true;
    } else {
      this.filterRatingInc = !this.filterRatingInc;
    }
    this.sortRestaurantsByRating()
    console.info(this.restaurants)
  }

  togglePrice() {

    if (this.filterPriceLvlInc === null) {
      this.filterPriceLvlInc = true;
    } else {
      this.filterPriceLvlInc = !this.filterPriceLvlInc;
    }
    console.info(this.filterPriceLvlInc)
    this.sortRestaurantsByPrice()
  }

  sortRestaurantsByRating(): void {
    if (this.filterRatingInc) {
      this.sortedRestaurants = [...this.restaurants].sort((a, b) => {
        if (a.rating === -1) return 1;
        if (b.rating === -1) return -1;
        return b.rating - a.rating;
      });
    } else {
      this.sortedRestaurants = [...this.restaurants].sort((a, b) => {
        if (a.rating === -1) return 1;
        if (b.rating === -1) return -1;
        return a.rating - b.rating;
      });
    }
  }

  sortRestaurantsByPrice(): void {
    if (this.filterPriceLvlInc) {
      this.sortedRestaurants = [...this.restaurants].sort((a, b) => {
        if (a.priceLevel === -1) return 1;
        if (b.priceLevel === -1) return -1;
        return b.priceLevel - a.priceLevel;
      });
    } else {
      this.sortedRestaurants = [...this.restaurants].sort((a, b) => {
        if (a.priceLevel === -1) return 1;
        if (b.priceLevel === -1) return -1;
        return a.priceLevel - b.priceLevel;
      });
    }
  }
  
}
