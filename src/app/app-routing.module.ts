import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  { path: '', component: HomeComponent},  
  { path: 'details/:id', component: HomeComponent},
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
