import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SearchComponent } from './components/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchResultComponent } from './components/search-result.component';
import { PlaceDetailsComponent } from './components/place-details.component';
import { UserLoginPageComponent } from './components/user-login-page.component';
import { RegDialogComponent } from './components/dialog/reg-dialog.component';
import { googleImgPipe } from './components/custom-pipes/googleImg.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocationDialogComponent } from './components/dialog/location-dialog.component';
import { safePipe } from './components/custom-pipes/safe.pipe';
import { RatingIconPipe } from './components/custom-pipes/rating-icon.pipe';
import { PriceIconPipe } from './components/custom-pipes/price-icon.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultComponent,
    PlaceDetailsComponent,
    UserLoginPageComponent,
    RegDialogComponent,
    googleImgPipe,
    safePipe,
    LocationDialogComponent,
    RatingIconPipe,
    PriceIconPipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
