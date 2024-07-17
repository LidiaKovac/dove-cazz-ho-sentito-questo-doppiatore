import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterModule } from './characters/character.module';
import { AuthModule } from './auth/auth.module';
import { LandingModule } from './landing/landing.module';
import { DoppiatoriModule } from './doppiatori/doppiatori.module';
import { NgIconsModule } from '@ng-icons/core';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ionClose, ionHomeOutline } from '@ng-icons/ionicons';
import { IonicModule } from '@ionic/angular';
import { AlertComponent } from './components/feedback/alert/alert.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CharacterModule,
    AuthModule,
    LandingModule,
    DoppiatoriModule,
    NgIconsModule.withIcons({ionHomeOutline, ionClose}),
    IonicModule.forRoot({})
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
