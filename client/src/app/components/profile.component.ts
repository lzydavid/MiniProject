import { Component,OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserAccount } from '../model';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form!:FormGroup
  currentUser!:UserAccount

  constructor(private authSvc:AuthService,private fb:FormBuilder){}

  ngOnInit(): void {
    this.currentUser = this.authSvc.currentUser
  }

  createForm(){
    return this.fb.group({
      firstName:this.fb.control<string>(''),
      lastName:this.fb.control<string>('')
    })
  }

}
