import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterModule } from './characters/character.module';
import { AuthModule } from './auth/auth.module';
import { LandingModule } from './landing/landing.module';
import { DoppiatoriModule } from './doppiatori/doppiatori.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CharacterModule,
    AuthModule,
    LandingModule,
    DoppiatoriModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
