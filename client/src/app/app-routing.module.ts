import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search.component';
import { SearchResultComponent } from './components/search-result.component';
import { PlaceDetailsComponent } from './components/place-details.component';
import { UserLoginPageComponent } from './components/user-login-page.component';

const routes: Routes = [
  {path:'',component:SearchComponent},
  {path:'login',component:UserLoginPageComponent},
  {path:'result',component:SearchResultComponent},
  {path:'details',component:PlaceDetailsComponent},
  {path:'**',redirectTo:'/',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
