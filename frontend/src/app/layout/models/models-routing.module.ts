import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ModelsComponent } from './models.component';

const routes: Routes = [
  {
    path: 'models',
    component: ModelsComponent,
    data: { title: 'Models List' }
  }, {
    path: '',
    component: ModelsComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ModelsRoutingModule {}
