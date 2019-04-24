import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ModelsService } from './../../../../shared/services/models/models.service';
import { Model } from './../../../../shared/services/models/model';
import { ModelsComponent } from '../../models.component';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {

  formData = new FormData();

  constructor(
    public dialogRef: MatDialogRef<AddModelComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Model,
    public modelsService: ModelsService
  ) { }

  ngOnInit() {
  }

  submit():void {
    this.model.created_at = new Date().toString()
    this.modelsService.addModel(this.model);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
