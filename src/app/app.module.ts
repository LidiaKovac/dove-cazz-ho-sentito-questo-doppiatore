import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionClose, ionEye, ionEyeOff, ionHomeOutline, ionSearch } from '@ng-icons/ionicons';
import { IonicModule } from '@ionic/angular';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CharacterModule } from './features/characters/character.module';
import { AuthModule } from './features/auth/auth.module';
import { LandingModule } from './features/landing/landing.module';
import { DoppiatoriModule } from './features/doppiatori/doppiatori.module';
import { NavbarComponent } from './shared/components/layout/navbar/navbar.component';
import { AlertComponent } from './shared/components/feedback/alert/alert.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { InputComponent } from './shared/components/layout/input/input.component';
import { WorksModule } from './features/works/works.module';
import { CardComponent } from './shared/components/layout/card/card.component';
import { ButtonComponent } from './shared/components/layout/button/button.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

@NgModule({
  declarations: [AppComponent, NavbarComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    InputComponent,
    ButtonComponent,
    NgIconsModule.withIcons({ ionHomeOutline, ionClose, ionSearch, ionEye, ionEyeOff }),
    IonicModule.forRoot({}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      useClass: TokenInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
