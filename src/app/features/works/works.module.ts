import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SuggestionInputComponent } from 'src/app/shared/components/layout/suggestion-input/suggestion-input.component';
import { CardComponent } from 'src/app/shared/components/layout/card/card.component';
import { ButtonComponent } from 'src/app/shared/components/layout/button/button.component';
import { NgIconsModule } from '@ng-icons/core';
import { IonicModule } from '@ionic/angular';
import { ionEye, ionEyeOff } from '@ng-icons/ionicons';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
];

@NgModule({
  declarations: [SearchComponent, CardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SuggestionInputComponent,
    ButtonComponent,
    NgIconsModule.withIcons({ ionEye, ionEyeOff }),
    IonicModule.forRoot({}),
  ],
})
export class WorksModule {}
