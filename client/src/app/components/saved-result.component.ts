import { Component } from '@angular/core';
import { Restaurant,BookmarkedRestaurants, Collection } from '../model';
import { SvcService } from '../service/svc.service';

@Component({
  selector: 'app-saved-result',
  templateUrl: './saved-result.component.html',
  styleUrls: ['./saved-result.component.css']
})
export class SavedResultComponent {

  bookmarkedPlaces:Restaurant[] = BookmarkedRestaurants
  collections!:Collection[]

  constructor(private svc:SvcService){
    this.collections = svc.userCollection
  }
}
