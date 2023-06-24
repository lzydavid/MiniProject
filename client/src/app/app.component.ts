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
          }
        }
      )
    }

    if(this.isLoggedIn){
      const col = await this.apiSvc.getUserCollections(this.authSvc.currentUser.id)
        
      this.svc.userCollection=col
    }

    console.info('>>> app.component current user:',this.authSvc.currentUser)
    console.info(">>> app.component isLoggedIn: "  + this.isLoggedIn)
    console.info(">>> app.component col: ",this.svc.userCollection)
  }

  logout(){
    this.authSvc.isLoggedIn=false
    this.authSvc.updateLoggedStatus(false)
    localStorage.removeItem('token')
  }

  
}
