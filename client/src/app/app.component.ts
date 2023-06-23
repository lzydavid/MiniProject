import { Component,OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from './model';
import { ServerApiService } from './service/server-api.service';
import { SvcService } from './service/svc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoggedIn!:boolean

  constructor(private authSvc:AuthService,private apiSvc:ServerApiService,private svc:SvcService) {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  async ngOnInit() {
    const token = localStorage.getItem("token")
    if(token){
      await this.authSvc.getCurrentUserInfo().then(
        info=>{
          const acc:UserAccount = info.account
          if(acc){
            this.authSvc.currentUser=acc
            this.authSvc.isLoggedIn=true
            this.isLoggedIn=true

            this.apiSvc.getUserCollections(acc.id).then(
              (col)=>{
                this.svc.userCollection=col
              }
            )
          }
        }
      )
    }
    console.info('>>> app.component: ',this.authSvc.currentUser)

    console.info(">>> app.component isLoggedIn:"  + this.isLoggedIn)
  }

  logout(){
    this.authSvc.isLoggedIn=false
    this.authSvc.updateLoggedStatus(false)
    localStorage.removeItem('token')
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
