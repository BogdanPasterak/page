import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForsaleComponent } from './forsale/forsale.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  // { path: '/app', component: AppComponent},
  // { path: '/forsale', component: ForsaleComponent},
  { path: '', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
