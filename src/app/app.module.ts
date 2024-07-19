import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionClose, ionHomeOutline } from '@ng-icons/ionicons';
import { IonicModule } from '@ionic/angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CharacterModule } from './features/characters/character.module';
import { AuthModule } from './features/auth/auth.module';
import { LandingModule } from './features/landing/landing.module';
import { DoppiatoriModule } from './features/doppiatori/doppiatori.module';
import { NavbarComponent } from './shared/components/layout/navbar/navbar.component';
import { AlertComponent } from './shared/components/feedback/alert/alert.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent, NavbarComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CharacterModule,
    AuthModule,
    LandingModule,
    DoppiatoriModule,
    NgIconsModule.withIcons({ ionHomeOutline, ionClose }),
    IonicModule.forRoot({}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
