import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ManufacturersService } from './../../../../shared/services/manufacturers/manufacturers.service';
import { Manufacturer } from './../../../../shared/services/manufacturers/manufacturer';
import { ManufacturersComponent } from '../../manufacturers.component';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {

  formData = new FormData();

  constructor(
    public dialogRef: MatDialogRef<AddManufacturerComponent>,
    @Inject(MAT_DIALOG_DATA) public manufacturer: Manufacturer,
    public manufacturersService: ManufacturersService
  ) { }

  ngOnInit() {
  }

  submit():void {
    this.manufacturer.created_at = new Date().toString()
    this.manufacturersService.addManufacturer(this.manufacturer);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
