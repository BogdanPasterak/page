import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForsaleComponent } from './forsale/forsale.component';
import { AppComponent } from './app.component';
import { HomeandcarComponent } from './homeandcar/homeandcar.component';
import { ForSaleViewComponent } from './for-sale-view/for-sale-view.component';


const routes: Routes = [
  { path: '', component: HomeandcarComponent},
  // { path: '//#endregion', component: HomeandcarComponent},
  // { path: '/homeandcar',  component: HomeandcarComponent, pathMatch: 'full'},
  { path: 'view', component: ForSaleViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
