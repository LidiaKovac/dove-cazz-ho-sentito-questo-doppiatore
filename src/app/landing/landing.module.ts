import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './view/landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { InputComponent } from '../components/layout/input/input.component';
import { ButtonComponent } from '../components/layout/button/button.component';
import { FormsModule } from '@angular/forms';
import { SuggestionInputComponent } from '../components/layout/suggestion-input/suggestion-input.component';

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
