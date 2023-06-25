import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ServerApiService } from '../service/server-api.service';
import { RegisterResult, UserAccount, UserCredentials } from '../model';
import { RegDialogComponent } from './dialog/reg-dialog.component';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UrlService } from '../service/url.service';
import { SvcService } from '../service/svc.service';
import { MatLegacyButtonModule} from '@angular/material/legacy-button'


@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})
export class UserLoginPageComponent implements OnInit{

  LoginForm!:FormGroup
  RegisterForm!:FormGroup
  RegStatus!:boolean
  RegMessage!:string
  LoginStatus!:boolean
  LoginMessage!:string
  signUp:boolean = false
  isLoggedIn=false

  constructor(private fb:FormBuilder,private apiSvc:ServerApiService,private matDialog:MatDialog,private authSvc:AuthService,private router:Router,private urlSvc:UrlService,private svc:SvcService){
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit(): void {
    this.LoginForm=this.createLoginForm()
    this.RegisterForm=this.createRegisterForm()
  }

  signup(){
    this.signUp=!this.signUp
  }

  onSubmitReg(){

    const newAcc:UserAccount={
      id: '-',
      email: this.RegisterForm.value['email'],
      password: this.RegisterForm.value['password'],
      firstName: this.RegisterForm.value['firstName'],
      lastName: this.RegisterForm.value['lastName']
    }

    this.apiSvc.registerNewAccount(newAcc).then(
      (result) => {
        this.RegStatus=result.status
        this.RegMessage=result.message
        console.info(this.RegStatus)
        console.info(this.RegMessage)

        if(this.RegStatus){
          const dialogConfig = new MatDialogConfig()
          dialogConfig.data = this.RegMessage
          this.matDialog.open(RegDialogComponent,dialogConfig)

          this.signUp=!this.signUp
        }
      }
    )
  }

  async onSubmitLogin(){

    const userCredentials:UserCredentials = {
      email:this.LoginForm.value['email'],
      password:this.LoginForm.value['password']
    }
    
    await this.authSvc.login(userCredentials).then(
      (message)=>{
      
        if(this.isLoggedIn==true){
          if(this.svc.restaurants){
            this.router.navigate(['/result'])
          }
          else{
            this.router.navigate(['/'])
          }
        }
        else{
          alert(message)
        }
        
      }
    )
  }

  createLoginForm(){
    return this.fb.group({
      email:this.fb.control<string>('',[Validators.required,Validators.email]),
      password:this.fb.control<string>('',[Validators.required,Validators.minLength(8)]),
    })
  }

  isFormInvalid():boolean {

    const password = this.RegisterForm.value['password']
    const confirmPassword = this.RegisterForm.value['confirmPassword']
    const pwMatch = password===confirmPassword

    return !(pwMatch&&this.RegisterForm.valid)
  }

  createRegisterForm(){
    return this.fb.group({
      firstName:this.fb.control<string>('',Validators.required),
      lastName:this.fb.control<string>('',Validators.required),
      email:this.fb.control<string>('',[Validators.required,Validators.email]),
      password:this.fb.control<string>('',[Validators.required,Validators.minLength(8)]),
      confirmPassword:this.fb.control<string>('',[Validators.required,Validators.minLength(8)]),
    })
  }

  getErrorMsg(){
    const password = this.RegisterForm.value['password']
    const confirmPassword = this.RegisterForm.value['confirmPassword']
    if(password!==confirmPassword){
      return 'Password does not match'
    }
    return 'must have at least 8 char'
  }
}
