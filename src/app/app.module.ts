import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ForsaleComponent } from './forsale/forsale.component';
import { HomeandcarComponent } from './homeandcar/homeandcar.component';

import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ForsaleComponent,
    HomeandcarComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
