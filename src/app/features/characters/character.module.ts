import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareCardComponent } from './compare-card/compare-card.component';
import { SingleCharacterCardComponent } from './single-character-card/single-character-card.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [CompareCardComponent, SingleCharacterCardComponent],
    exports: [CompareCardComponent, SingleCharacterCardComponent], imports: [CommonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CharacterModule {}
