import { Component } from '@angular/core';
import { Restaurant,BookmarkedRestaurants } from '../model';

@Component({
  selector: 'app-saved-result',
  templateUrl: './saved-result.component.html',
  styleUrls: ['./saved-result.component.css']
})
export class SavedResultComponent {

  bookmarkedPlaces:Restaurant[] = BookmarkedRestaurants

  constructor(){}
}
