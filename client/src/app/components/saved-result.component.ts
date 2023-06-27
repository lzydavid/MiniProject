import { Component,OnDestroy } from '@angular/core';
import { Restaurant,BookmarkedRestaurants, Collection } from '../model';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-result',
  templateUrl: './saved-result.component.html',
  styleUrls: ['./saved-result.component.css']
})
export class SavedResultComponent implements OnDestroy {

  bookmarkedPlaces:Restaurant[] = BookmarkedRestaurants
  collections!:Collection[]

  constructor(private svc:SvcService,private apiSvc:ServerApiService,private authSvc:AuthService,private router:Router){
    this.collections = svc.userCollection
  }

  async ngOnDestroy() {

    if(this.collections!=null){
      this.svc.userCollection = this.collections
    const saved = await this.apiSvc.saveCollection(this.authSvc.currentUser!.id)
    }
  }

  removeFromCol(c:Collection,r:Restaurant) {
    c.restaurants = c.restaurants.filter(
      (res)=>{
        return res.placeId != r.placeId
      }
    )   
  }

  deleteCol(c:Collection){

    this.collections = this.collections.filter(col =>{
      return col.colId !=c.colId
    })
  }

  onSelect(r:Restaurant) {

    this.svc.restaurantSelectedToView = r
    this.router.navigate(['/details'])
  }
}
