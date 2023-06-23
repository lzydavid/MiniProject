import { Component,OnDestroy } from '@angular/core';
import { Restaurant,BookmarkedRestaurants, Collection } from '../model';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-saved-result',
  templateUrl: './saved-result.component.html',
  styleUrls: ['./saved-result.component.css']
})
export class SavedResultComponent implements OnDestroy {

  bookmarkedPlaces:Restaurant[] = BookmarkedRestaurants
  collections!:Collection[]

  constructor(private svc:SvcService,private apiSvc:ServerApiService,private authSvc:AuthService){
    this.collections = svc.userCollection
  }

  async ngOnDestroy() {

    this.svc.userCollection = this.collections
    await this.apiSvc.saveCollection(this.authSvc.currentUser.id)
  }

  removeFromCol(c:Collection,r:Restaurant) {
    c.restaurants = c.restaurants.filter(
      (res)=>{
        return res.placeId != r.placeId
      }
    )   
  }

  onSelect() {
    
  }
}
