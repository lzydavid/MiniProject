import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search.component';
import { SearchResultComponent } from './components/search-result.component';
import { PlaceDetailsComponent } from './components/place-details.component';
import { UserLoginPageComponent } from './components/user-login-page.component';
import { AccountComponent } from './components/account.component';
import { ProfileComponent } from './components/profile.component';
import { SavedResultComponent } from './components/saved-result.component';

const routes: Routes = [
  {path:'',component:SearchComponent},
  {path:'login',component:UserLoginPageComponent},
  {path:'result',component:SearchResultComponent},
  {path:'details',component:PlaceDetailsComponent},
  {path:'acc',component:AccountComponent,children:[
    {path:'profile',component:ProfileComponent},
    {path:'saved',component:SavedResultComponent},
    {path: '**', redirectTo: 'acc', pathMatch: 'full'}
  ]},
  {path:'**',redirectTo:'/',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
