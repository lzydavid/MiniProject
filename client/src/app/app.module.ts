import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SearchComponent } from './components/search.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchResultComponent } from './components/search-result.component';
import { PlaceDetailsComponent } from './components/place-details.component';
import { UserLoginPageComponent } from './components/user-login-page.component';
import { RegDialogComponent } from './components/dialog/reg-dialog.component';
import { googleImgPipe } from './components/custom-pipes/googleImg.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { safePipe } from './components/custom-pipes/safe.pipe';
import { RatingIconPipe } from './components/custom-pipes/rating-icon.pipe';
import { PriceIconPipe } from './components/custom-pipes/price-icon.pipe';
import { AccountComponent } from './components/account.component';
import { SavedResultComponent } from './components/saved-result.component';
import { ProfileComponent } from './components/profile.component';
import { CreateColDialogComponent } from './components/dialog/create-col-dialog.component';
import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';
import { ImgSliderComponent } from './components/img-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultComponent,
    PlaceDetailsComponent,
    RegDialogComponent,
    googleImgPipe,
    safePipe,
    RatingIconPipe,
    PriceIconPipe,
    AccountComponent,
    SavedResultComponent,
    ProfileComponent,
    CreateColDialogComponent,
    ImgSliderComponent,
    UserLoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,useClass:HttpInterceptorInterceptor,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
