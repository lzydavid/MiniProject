import { Component,OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserAccount } from '../model';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

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

  constructor(private authSvc:AuthService,private fb:FormBuilder){

    console.info(authSvc.currentUser)
    if(this.authSvc.currentUser!=null){
      this.currentUser = this.authSvc.currentUser
    }

    console.info(this.currentUser)
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
    console.info(v)
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

  onSubmit(){
    if(this.pForm.value['oldPassword']!=this.pForm.value['oldPasswordCheck']){
      alert('Password does not match')
    }
    else{
      
    }
  }
}
