import { Component,OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserAccount } from '../model';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ServerApiService } from '../service/server-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  pForm!:FormGroup
  currentUser!:UserAccount
  enterPw:Boolean=false
  disableUpdate:boolean=true

  constructor(private authSvc:AuthService,private fb:FormBuilder,private apiSvc:ServerApiService,private router:Router){

    if(this.authSvc.currentUser!=null){
      this.currentUser = this.authSvc.currentUser
    }
  }

  ngOnInit(): void {
    this.pForm = this.createForm(this.currentUser)
  }

  createForm(user:UserAccount):FormGroup{
    return this.fb.group({
      email:this.fb.control<string>(user.email,[Validators.required,Validators.email]),
      firstName:this.fb.control<string>(user.firstName,[Validators.required]),
      lastName:this.fb.control<string>(user.lastName,[Validators.required]),
      oldPassword:this.fb.control<string>('',[Validators.required,Validators.minLength(8)]),
      oldPasswordCheck:this.fb.control<string>('',[Validators.required,Validators.minLength(8)]),
      newPassword:this.fb.control<string>(user.password,[Validators.required,Validators.minLength(8)])
    })
  }

  isFormInvalid(){

    const v = (
      this.pForm.get('email')?.hasError('required') || 
      this.pForm.get('email')?.hasError('email') ||
      this.pForm.get('firstName')?.hasError('required') || 
      this.pForm.get('lastName')?.hasError('required') || 
      this.pForm.get('newPassword')?.hasError('required') ||
      this.pForm.get('newPassword')?.hasError('minlength')
    )
    return v
  }

  update(){
    
    const isAccDetailsSame:boolean = (
      this.pForm.value['email']===this.currentUser.email && 
      this.pForm.value['firstName']===this.currentUser.firstName && 
      this.pForm.value['lastName']===this.currentUser.lastName && 
      this.pForm.value['newPassword']===this.currentUser.password)

    if(isAccDetailsSame){
      alert('no change detected')
    }else{
      this.enterPw=true
    }
  }

  async onSubmit(){
    if(this.pForm.value['oldPassword']!=this.pForm.value['oldPasswordCheck']){
      alert('Password does not match')
    }
    else{
      
      if(this.pForm.value['oldPassword']!=this.currentUser.password){
        alert('Wrong password Entered')
      }else{
        const newAcc:UserAccount = {
          id:this.currentUser.id,
          email:this.pForm.value['email'],
          password:this.pForm.value['newPassword'],
          firstName:this.pForm.value['firstName'],
          lastName:this.pForm.value['lastName']
        }

        const result = await this.apiSvc.updateUserAccount(newAcc)

        if(result.status==true){

          alert(result.message)

          this.authSvc.currentUser=null;
          this.authSvc.isLoggedIn=false;
          this.authSvc.updateLoggedStatus(false)
          localStorage.removeItem('token')
          this.router.navigate(['/'])

        }else{
          alert(result.message)
        }
      }
    }
  }
}
