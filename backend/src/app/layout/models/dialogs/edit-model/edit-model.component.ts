import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ModelsService } from './../../../../shared/services/models/models.service';
import { ModelContainersService } from './../../../../shared/services/models/model-containers.service';
import { environment } from './../../../../../environments/environment';
import { Model } from './../../../../shared/services/models/model';
import { ManufacturersService } from './../../../../shared/services/manufacturers/manufacturers.service';
import { Manufacturer } from './../../../../shared/services/manufacturers/manufacturer';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.css']
})
export class EditModelComponent implements OnInit {

  formData1 = new FormData();
  formData2 = new FormData();
  manufacturers: Manufacturer[];
  fileToUpload: File = null;
  DownloadURL = environment.API_ENDPOINT;

  constructor(
    public dialogRef: MatDialogRef<EditModelComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Model,
    public manufacturersService: ManufacturersService,
    private modelsService: ModelsService,
    private modelContainersService: ModelContainersService
  ) { }

  ngOnInit() {
    this.getManufacturers();
   }

  submit() {
    this.model.updated_at = new Date().toString();
    console.log(this.model)
    this.modelsService.updateModel(this.model);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFirstImage(files: FileList) {
    this.formData1.append('first_image', files[0], files[0].name);

    this.modelContainersService
      .uploadFirstFile(this.formData1)
      .subscribe(filename => console.log(files[0].name));
    this.model.first_image = 'http://localhost:3000/api/containers/first_image/download/' + files[0].name;
    
    console.log(this.model.first_image)
  
  }

  handleSecondImage(files: FileList) {
    this.formData2.append('second_image', files[0], files[0].name);
    this.modelContainersService
      .uploadSecondFile(this.formData2)
      .subscribe(filename => console.log(files[0].name));
    this.model.second_image = 'http://localhost:3000/api/containers/second_image/download/' + files[0].name;
  }

  getManufacturers() {
    this.manufacturersService
      .getManufacturerNames()
      .subscribe(manufacturers => (this.manufacturers = manufacturers));
  }

  public confirmAdd(): void {
  
  }
}
