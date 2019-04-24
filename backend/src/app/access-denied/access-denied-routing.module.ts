import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './access-denied.component';

const routes: Routes = [
  {
    path: '', component: AccessDeniedComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessDeniedRoutingModule { }
