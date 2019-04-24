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
import { AddModelComponent } from './dialogs/add-Model/add-model.component';
import { EditModelComponent } from './dialogs/edit-Model/edit-model.component';
import { DeleteModelComponent } from './dialogs/delete-Model/delete-model.component';


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
  providers: [ModelsService],
  entryComponents: [
    AddModelComponent,
    EditModelComponent,
    DeleteModelComponent
  ]
})
export class ModelsModule { }
