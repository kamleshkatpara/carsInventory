import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModelsService } from './../../../../shared/services/models/models.service';
import { ModelContainersService } from './../../../../shared/services/models/model-containers.service';
import { Model } from './../../../../shared/services/models/model';
import { environment } from '../.../../../../../../environments/environment';

@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrls: ['./delete-model.component.css']
})
export class DeleteModelComponent implements OnInit {

  models: Model[];
  DownloadURL = environment.API_ENDPOINT;

  constructor(public dialogRef: MatDialogRef<DeleteModelComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any, public modelsService: ModelsService,
    private modelContainersService: ModelContainersService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmSell(): void {
      console.log(this.model.model_count)
    if(this.model.model_count == 1) {
      const first_image = this.model.first_image.replace('/first_image/download/', '');
      const second_image = this.model.second_image.replace('/second_image/download/', '');
  
      this.modelContainersService.deleteFile(first_image).subscribe(res => console.log(res));
      this.modelContainersService.deleteFile(second_image).subscribe(res => console.log(res));
    }

    this.modelsService.deleteModel(this.model.id);

  }
}
