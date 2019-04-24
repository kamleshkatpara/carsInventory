import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ManufacturersService } from './../../../../shared/services/manufacturers/manufacturers.service';
import { Manufacturer } from './../../../../shared/services/manufacturers/manufacturer';
import { environment } from '../.../../../../../../environments/environment';


@Component({
  selector: 'app-delete-manufacturer',
  templateUrl: './delete-manufacturer.component.html',
  styleUrls: ['./delete-manufacturer.component.css']
})
export class DeleteManufacturerComponent implements OnInit {

  manufacturers: Manufacturer[];

  constructor(public dialogRef: MatDialogRef<DeleteManufacturerComponent>,
    @Inject(MAT_DIALOG_DATA) public manufacturer: any, public manufacturersService: ManufacturersService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.manufacturersService.deleteManufacturer(this.manufacturer.id);
  }

}
