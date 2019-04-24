import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsComponent } from './models.component';
import { ModelsRoutingModule } from './models-routing.module';
import { MatCardModule } from '@angular/material/card';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatProgressBarModule
} from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { ModelsService } from './../.././shared/services/models/models.service';
import { AddModelComponent } from './dialogs/add-model/add-model.component';
import { EditModelComponent } from './dialogs/edit-model/edit-model.component';
import { DeleteModelComponent } from './dialogs/delete-model/delete-model.component';
import { ManufacturersService } from 'src/app/shared/services/manufacturers/manufacturers.service';
import { ModelContainersService } from 'src/app/shared/services/models/model-containers.service';


@NgModule({
  declarations: [ModelsComponent, AddModelComponent, EditModelComponent, DeleteModelComponent],
  imports: [
    CommonModule,
    ModelsRoutingModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatRadioModule,
    MatGridListModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ModelsService, ManufacturersService, ModelContainersService],
  entryComponents: [
    AddModelComponent,
    EditModelComponent,
    DeleteModelComponent
  ]
})
export class ModelsModule { }
