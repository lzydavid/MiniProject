import { Component,ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Region,Option } from 'src/app/model';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent {

  constructor (private dialogRef:MatDialogRef<LocationDialogComponent>) {}
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  categories: Region[] = [
    {
      name: 'West',
      options: [
        { name: 'Bukit Batok' },
        { name: 'Bukit Panjang' },
        { name: 'Boon Lay' },
        { name: 'Pioneer' },
        { name: 'Choa Chu Kang' },
        { name: 'Clementi' },
        { name: 'Tuas' },
        { name: 'Pioneer' },
        { name: 'Pasir Laba'},
        { name: 'Teban Gardens'},
        { name: 'West Coast'}
      ]
    },
    {
      name: 'East',
      options: [
        { name: 'Bedok' },
        { name: 'Changi' },
        { name: 'Paya Lebar' },
        { name: 'Pasir Ris' },
        { name: 'Tampines' }
      ]
    },
    {
      name: 'North',
      options: [
        { name: 'Lim Chu Kang' },
        { name: 'Mandai' },
        { name: 'Sembawang' },
        { name: 'Simpang' },
        { name: 'Sungei Kadut' },
        { name: 'Woodlands' },
        { name: 'Yishun' }
      ]
    },
    {
      name: 'North-East',
      options: [
        { name: 'Ang Mo Kio' },
        { name: 'Hougang' },
        { name: 'Punggol' },
        { name: 'Seletar' },
        { name: 'Sengkang ' },
        { name: 'Serangoon' }
      ]
    },
    {
      name: 'Central',
      options: [
        { name: 'Bishan' },
        { name: 'Bukit Merah' },
        { name: 'Geylang' },
        { name: 'Kallang' },
        { name: 'Marine Parade' },
        { name: 'Queenstown' },
        { name: 'Southern Islands' },
        { name: 'Toa Payoh' },
      ]
    }
  ];

  onOptionSelect(option: Option) {
    console.log('Selected option:', option);
    const loc:string = option.name
    this.accordion.closeAll()
    this.dialogRef.close(loc)
   }
  
}
