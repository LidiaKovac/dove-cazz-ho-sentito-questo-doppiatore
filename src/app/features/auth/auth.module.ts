import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './views/auth/auth.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthRoutingModule } from './auth-routing.module';
import { InputComponent } from 'src/app/shared/components/layout/input/input.component';
import { SuggestionInputComponent } from 'src/app/shared/components/layout/suggestion-input/suggestion-input.component';
import { ButtonComponent } from 'src/app/shared/components/layout/button/button.component';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';

@NgModule({
  declarations: [AuthComponent, ProfileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AuthRoutingModule,
    InputComponent,
    SuggestionInputComponent,
    ButtonComponent,
  ],
  providers: [
    {
      useClass: TokenInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
})
export class AuthModule {}
