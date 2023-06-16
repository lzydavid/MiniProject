import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-col-dialog',
  templateUrl: './create-col-dialog.component.html',
  styleUrls: ['./create-col-dialog.component.css']
})
export class CreateColDialogComponent implements OnInit {

  form!:FormGroup

  constructor(private dialogRef:MatDialogRef<CreateColDialogComponent>,private fb:FormBuilder){}

  ngOnInit() {
    this.form = this.fb.group({
      colName:this.fb.control<string>('') ,
    });
}

  save() {
    this.dialogRef.close(this.form.value);
}

  close() {
    this.dialogRef.close();
  }
}
