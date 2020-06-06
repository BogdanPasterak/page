import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ForsaleComponent } from './forsale/forsale.component';
import { HomeandcarComponent } from './homeandcar/homeandcar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CarComponent } from './car/car.component';
import { ContactComponent } from './contact/contact.component';
import { LielementComponent } from './lielement/lielement.component';
import { ForSalePartComponent } from './for-sale-part/for-sale-part.component'
import { environment } from 'src/environments/environment';
import { CreatePartComponent } from './create-part/create-part.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalComponent as ModalComponent } from './modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EditPartComponent } from './edit-part/edit-part.component';
import { FooterComponent } from './footer/footer.component';
import { AddSlideComponent } from './add-slide/add-slide.component';
import { EditSlideComponent } from './edit-slide/edit-slide.component';
import { ForSaleViewComponent } from './for-sale-view/for-sale-view.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ForsaleComponent,
    HomeandcarComponent,
    AboutComponent,
    HomeComponent,
    CarComponent,
    ContactComponent,
    LielementComponent,
    ForSalePartComponent,
    CreatePartComponent,
    LoginComponent,
    ModalComponent,
    EditPartComponent,
    FooterComponent,
    AddSlideComponent,
    EditSlideComponent,
    ForSaleViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
