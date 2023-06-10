import { Component, Inject } from '@angular/core';
import {} from '@angular/material'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-dialog',
  templateUrl: './reg-dialog.component.html',
  styleUrls: ['./reg-dialog.component.css']
})
export class RegDialogComponent {

  message!:string

  constructor(private dialogRef:MatDialogRef<RegDialogComponent> ,@Inject(MAT_DIALOG_DATA) data:string,private router:Router) {
    this.message=data
  }

  close() {
    this.dialogRef.close()
    this.router.navigate(['/login'])
  }

}
