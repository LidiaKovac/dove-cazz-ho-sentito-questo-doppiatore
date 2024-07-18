import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './views/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { InputComponent } from '../components/layout/input/input.component';
import { ButtonComponent } from '../components/layout/button/button.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SuggestionInputComponent } from '../components/layout/suggestion-input/suggestion-input.component';



@NgModule({
  declarations: [
    AuthComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AuthRoutingModule,
    InputComponent,
    SuggestionInputComponent,
    ButtonComponent
  ],
  providers: [
    {
      useClass: TokenInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true
    }
  ]
})
export class AuthModule { }
