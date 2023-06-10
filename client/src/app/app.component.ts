import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
      this.getCurrentLocation()
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Handle successful retrieval of current position
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
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
