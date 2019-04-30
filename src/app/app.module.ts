import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';
import { DataService } from './data.service';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { CardComponent } from './card/card.component';
import { NotfoundComponent } from './notfound/notfound.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,    
    FooterComponent, ModalComponent,
    InfiniteScrollerDirective,
    CardComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    
    
  ],
  exports: [
    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
