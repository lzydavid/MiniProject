import { Component ,OnInit, ViewChild} from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SvcService } from '../service/svc.service';
import { ServerApiService } from '../service/server-api.service';
import { MatAccordion } from '@angular/material/expansion';
import { Region,Option } from '../model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocationDialogComponent } from './dialog/location-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form!:FormGroup
  selectedLoc!:string

  constructor(private fb:FormBuilder,private router:Router,private svc:SvcService,private apiSvc:ServerApiService,private matDialog:MatDialog) {}

  ngOnInit(): void {
    this.form = this.createForm()
    //console.info(this.svc.restaurants)
  }

  onSubmit(){
    const query = this.form.value['query']
    const location = this.form.value['location'] || this.selectedLoc
    console.info('>>>Form'+ query + location)
    this.apiSvc.getResultFromSearch(query,location).then(
      result=>{
        this.svc.restaurants = result.results
        this.svc.nextPageToken = result.nextPageToken
      }
    ).then(
      ()=>{
        this.router.navigate(['/result'])
      }
    )
  }

  createForm(){
    return this.fb.group({
      query:this.fb.control<string>('',[Validators.required]),
      location:this.fb.control<string>('')
    })
  }

   displayLocation(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.minWidth='500px'
    const dialogRef = this.matDialog.open(LocationDialogComponent,dialogConfig)
    dialogRef.afterClosed().subscribe(
      (loc) =>{
        this.selectedLoc = loc
        console.info(this.selectedLoc)
      }
    )
    
   }
}

