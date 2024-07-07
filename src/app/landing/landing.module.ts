import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './view/landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { InputComponent } from '../components/layout/input/input.component';
import { ButtonComponent } from '../components/layout/button/button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, LandingRoutingModule, InputComponent, ButtonComponent, FormsModule],
})
export class LandingModule {
  constructor(){
    console.log("mod")
  }
}
