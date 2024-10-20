import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareComponent } from './view/compare.component';
import { DoppiatoriRoutingModule } from './doppiatori-routing.module';
import { CharacterModule } from '../characters/character.module';
import { ButtonComponent } from 'src/app/shared/components/layout/button/button.component';
import { InputComponent } from 'src/app/shared/components/layout/input/input.component';
import { SuggestionInputComponent } from 'src/app/shared/components/layout/suggestion-input/suggestion-input.component';

@NgModule({
  declarations: [CompareComponent],
  imports: [
    CommonModule,
    DoppiatoriRoutingModule,
    CharacterModule,
    ButtonComponent,
    InputComponent,
    SuggestionInputComponent,
  ],
})
export class DoppiatoriModule {}
