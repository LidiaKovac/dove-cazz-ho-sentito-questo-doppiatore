import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './view/landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { FormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/layout/input/input.component';
import { ButtonComponent } from 'src/app/shared/components/layout/button/button.component';
import { SuggestionInputComponent } from 'src/app/shared/components/layout/suggestion-input/suggestion-input.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    InputComponent,
    ButtonComponent,
    FormsModule,
    SuggestionInputComponent,
  ],
})
export class LandingModule {}
