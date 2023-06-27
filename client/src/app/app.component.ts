import { Component,OnInit,AfterViewInit} from '@angular/core';
import { AuthService } from './service/auth.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from './model';
import { ServerApiService } from './service/server-api.service';
import { SvcService } from './service/svc.service';
import { Router,NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{

  isLoggedIn!:boolean
  currentPage:string ='/'
  navForm!:FormGroup

  constructor(private authSvc:AuthService,private apiSvc:ServerApiService,private svc:SvcService,private router:Router,private fb:FormBuilder) {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  async ngOnInit() {

    this.navForm = this.createForm()

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
      const col = await this.apiSvc.getUserCollections(this.authSvc.currentUser!.id)
        
      this.svc.userCollection=col
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url;
        console.info('current page: ', this.currentPage);
      }
    });

    console.info('>>> app.component current user:',this.authSvc.currentUser)
    console.info(">>> app.component isLoggedIn: "  + this.isLoggedIn)
    console.info(">>> app.component col: ",this.svc.userCollection)
  }

  ngAfterViewInit(): void {
    var currPage = this.router.url
    console.info(currPage)
  }

  logout(){
    this.authSvc.isLoggedIn=false
    this.authSvc.currentUser=null
    this.authSvc.updateLoggedStatus(false)
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  async onSubmit(){
    
    const query = this.navForm.value['query']
    console.info('>>>Form '+ query)
    
    const result = await this.apiSvc.getResultFromSearch(query)
    this.svc.restaurants = result.results
    this.svc.nextPageToken = result.nextPageToken

    await new Promise((resolve) => setTimeout(resolve, 0));

    console.info('>>> navbar svc.res:',this.svc.restaurants)

    if (this.currentPage === '/result') {
      this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/result');
      });
    } else {
      this.router.navigate(['/result']);
    }

    this.navForm.reset()
  }

  createForm(){
    return this.fb.group({
      query:this.fb.control<string>('',[Validators.required,Validators.minLength(8)])
    })
  }
}
