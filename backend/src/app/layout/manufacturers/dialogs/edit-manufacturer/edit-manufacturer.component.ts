import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ManufacturersService } from './../../../../shared/services/manufacturers/manufacturers.service';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.css']
})
export class EditManufacturerComponent implements OnInit {

  formData = new FormData();

  constructor(
    public dialogRef: MatDialogRef<EditManufacturerComponent>,
    @Inject(MAT_DIALOG_DATA) public manufacturer: any,
    private manufacturersService: ManufacturersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.manufacturer.updated_at = new Date().toString();
    this.manufacturersService.updateManufacturer(this.manufacturer);
   // window.location.reload();
  }
}
