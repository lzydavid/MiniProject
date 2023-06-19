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

  constructor(private authSvc:AuthService,private fb:FormBuilder){}

  ngOnInit(): void {
    // this.currentUser = this.authSvc.currentUser
    this.currentUser = {
      firstName:'Ilea',lastName:'Spears',email:'IleaSpear@gmail.com',password:'12345678',id:''
    }
    this.pForm = this.createForm(this.currentUser)
  }



  createForm(user:UserAccount){
    return this.fb.group({
      firstName:this.fb.control<string>('',[Validators.required]),
      lastName:this.fb.control<string>('',[Validators.required]),
      oldPassword:this.fb.control<string>(''),
      oldPasswordCheck:this.fb.control<string>(''),
      newPassword:this.fb.control<string>('')
    })
  }

}
