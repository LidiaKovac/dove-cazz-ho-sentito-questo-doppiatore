import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareCardComponent } from './compare-card/compare-card.component';
import { SingleCharacterCardComponent } from './single-character-card/single-character-card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CompareCardComponent, SingleCharacterCardComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [CompareCardComponent, SingleCharacterCardComponent]
})
export class CharacterModule {}
