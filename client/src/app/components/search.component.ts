import { Component ,OnInit} from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SvcService } from '../service/svc.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form!:FormGroup

  constructor(private fb:FormBuilder,private router:Router,private generalSvc:SvcService) {}

  ngOnInit(): void {
      this.form = this.createForm()
  }

  onSubmit(){
    console.info(this.form.value)
    this.generalSvc.FormValue = this.form.value
    this.router.navigate(['/result'])
  }

  createForm(){
    return this.fb.group({
      query:this.fb.control<string>(''),
      location:this.fb.control<string>('')
    })
  }
}

