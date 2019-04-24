import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManufacturersComponent } from './manufacturers.component';

const routes: Routes = [
  {
    path: 'manufacturers',
    component: ManufacturersComponent,
    data: { title: 'Manufacturers List' }
  }, {
    path: '',
    component: ManufacturersComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ManufacturersRoutingModule {}
