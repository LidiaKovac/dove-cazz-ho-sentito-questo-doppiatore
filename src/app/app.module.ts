import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterModule } from './characters/character.module';
import { AuthModule } from './auth/auth.module';
import { LandingModule } from './landing/landing.module';
import { DoppiatoriModule } from './doppiatori/doppiatori.module';
import { NgIconsModule } from '@ng-icons/core';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ionHomeOutline } from '@ng-icons/ionicons';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CharacterModule,
    AuthModule,
    LandingModule,
    DoppiatoriModule,
    NgIconsModule.withIcons({ionHomeOutline}),
    IonicModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
