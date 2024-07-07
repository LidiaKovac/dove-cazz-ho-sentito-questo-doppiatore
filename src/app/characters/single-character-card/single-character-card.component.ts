import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-character-card',
  templateUrl: './single-character-card.component.html',
  styleUrls: ['./single-character-card.component.scss']
})
export class SingleCharacterCardComponent {
  @Input() name:string = "Marco Rossi"
  @Input() img:string = "https://source.boringavatars.com/beam/120/Mario Rossi?colors=EFCA08,4A6FA5"
  @Input() work:string = "Work"
}
