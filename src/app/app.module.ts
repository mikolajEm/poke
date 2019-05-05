import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';
import { DataService } from './data.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { CardComponent } from './card/card.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SelectComponent } from './material/select/select.component';
import { InputComponent } from './material/input/input.component';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,    
    FooterComponent, ModalComponent,
    InfiniteScrollerDirective,
    CardComponent,
    NotfoundComponent,
    SelectComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule
    
    
  ],
  exports: [
    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
