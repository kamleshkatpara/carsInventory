import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { MatToolbarModule, MatExpansionModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatDialogModule, MatListModule } from '@angular/material';
import { UsersService } from '../shared/services/users/users.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@NgModule({
  declarations: [LayoutComponent, NavComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [UsersService]
})
export class LayoutModule { }
