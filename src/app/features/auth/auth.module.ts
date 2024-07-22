import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './views/auth/auth.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthRoutingModule } from './auth-routing.module';
import { InputComponent } from 'src/app/shared/components/layout/input/input.component';
import { SuggestionInputComponent } from 'src/app/shared/components/layout/suggestion-input/suggestion-input.component';
import { ButtonComponent } from 'src/app/shared/components/layout/button/button.component';
import { ImgurUrlPipe } from 'src/app/shared/pipes/imgur-url.pipe';
import { ImportTutorialComponent } from './views/import-tutorial/import-tutorial.component';

@NgModule({
  declarations: [AuthComponent, ProfileComponent, ImportTutorialComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AuthRoutingModule,
    InputComponent,
    SuggestionInputComponent,
    ButtonComponent,
    ImgurUrlPipe,
  ],
  providers: [],
})
export class AuthModule {}
