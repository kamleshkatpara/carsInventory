import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule
} from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsersService } from '../shared/services/users/users.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  providers: [UsersService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
    HttpClientModule
  ]
})
export class LoginModule { }
