import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForsaleComponent } from './forsale/forsale.component';
import { AppComponent } from './app.component';
import { HomeandcarComponent } from './homeandcar/homeandcar.component';


const routes: Routes = [
  { path: 'homeandcar', component: HomeandcarComponent},
  { path: 'forsale', component: ForsaleComponent}
  // { path: '', redirectTo: '/homeandcar', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
