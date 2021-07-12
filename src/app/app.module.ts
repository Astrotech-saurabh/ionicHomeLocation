import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


// Imports By Saurabh
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC21jT0eNOmMfEqh7vgZQyCjbg0ABSoRGA',
    }),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
