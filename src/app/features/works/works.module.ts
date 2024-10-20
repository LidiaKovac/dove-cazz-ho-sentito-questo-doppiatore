import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SuggestionInputComponent } from 'src/app/shared/components/layout/suggestion-input/suggestion-input.component';
import { CardComponent } from 'src/app/shared/components/layout/card/card.component';
import { ButtonComponent } from 'src/app/shared/components/layout/button/button.component';
import { NgIconsModule } from '@ng-icons/core';
import { IonicModule } from '@ionic/angular';
import { ionClose, ionEye, ionEyeOff } from '@ng-icons/ionicons';
import { PaginationComponent } from 'src/app/shared/components/layout/pagination/pagination.component';
import { ModalComponent } from 'src/app/shared/components/layout/modal/modal.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
];

@NgModule({
  declarations: [SearchComponent, CardComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SuggestionInputComponent,
    ButtonComponent,
    PaginationComponent,
    NgIconsModule.withIcons({ ionEye, ionEyeOff, ionClose }),
    IonicModule.forRoot({}),
  ],
})
export class WorksModule {}
