import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
  { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }