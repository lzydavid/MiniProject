import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ServerApiService } from '../service/server-api.service';
import { RegisterResult, UserAccount, UserLogin } from '../model';
import { RegDialogComponent } from './dialog/reg-dialog.component';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';

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
  LoginUser!:UserAccount

  signUp:boolean = false

  constructor(private fb:FormBuilder,private apiSvc:ServerApiService,private matDialog:MatDialog){}

  ngOnInit(): void {
    this.LoginForm=this.createLoginForm()
  }

  signup(){
    this.signUp=!this.signUp
    this.RegisterForm=this.createRegisterForm()
  }

  onSubmitReg(){
    this.apiSvc.registerNewAccount(this.RegisterForm).then(
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

  onSubmitLogin(){

    this.apiSvc.login(this.LoginForm).then(
      (result) =>{
        this.LoginStatus = result['status']
        console.info(this.LoginStatus)
        if(!this.LoginStatus){
          this.LoginMessage=result['message']
        }else{
          this.LoginUser = result['account']
          console.info(this.LoginUser)
        }
      }
    )   
  }

  createLoginForm(){
    return this.fb.group({
      email:this.fb.control<string>('ilea@gmail.com',[Validators.required,Validators.email]),
      password:this.fb.control<string>('123456',[Validators.required,Validators.minLength(8)]),
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
      firstName:this.fb.control<string>('David',Validators.required),
      lastName:this.fb.control<string>('Lee',Validators.required),
      email:this.fb.control<string>('test@gmail.com',[Validators.required,Validators.email]),
      password:this.fb.control<string>('12345678',[Validators.required,Validators.minLength(8)]),
      confirmPassword:this.fb.control<string>('12345678',[Validators.required,Validators.minLength(8)]),
    })
  }

}
