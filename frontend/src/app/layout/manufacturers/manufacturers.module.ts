import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturersComponent } from './manufacturers.component';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
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
import { ManufacturersService } from './../.././shared/services/manufacturers/manufacturers.service';
import { AddManufacturerComponent } from './dialogs/add-manufacturer/add-manufacturer.component';
import { EditManufacturerComponent } from './dialogs/edit-manufacturer/edit-manufacturer.component';
import { DeleteManufacturerComponent } from './dialogs/delete-manufacturer/delete-manufacturer.component';


@NgModule({
  declarations: [ManufacturersComponent, AddManufacturerComponent, EditManufacturerComponent, DeleteManufacturerComponent],
  imports: [
    CommonModule,
    ManufacturersRoutingModule,
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
  providers: [ManufacturersService],
  entryComponents: [
    AddManufacturerComponent,
    EditManufacturerComponent,
    DeleteManufacturerComponent
  ]
})
export class ManufacturersModule { }
