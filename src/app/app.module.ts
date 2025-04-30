import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  ionClose,
  ionEye,
  ionEyeOff,
  ionHomeOutline,
  ionMenu,
  ionSearch,
} from '@ng-icons/ionicons';
import { IonicModule } from '@ionic/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/components/layout/navbar/navbar.component';
import { AlertComponent } from './shared/components/feedback/alert/alert.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { InputComponent } from './shared/components/layout/input/input.component';
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
    NgIconsModule.withIcons({ ionHomeOutline, ionClose, ionSearch, ionEye, ionEyeOff, ionMenu }),
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
