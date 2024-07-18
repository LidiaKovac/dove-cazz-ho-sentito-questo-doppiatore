import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DoppiatoriService } from 'src/app/doppiatori/doppiatori.service';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suggestion-input',
  templateUrl: './suggestion-input.component.html',
  styleUrls: ['./suggestion-input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent],
})
export class SuggestionInputComponent {
  @Input() dataSuggestionsVar!: string;
  @Input() placeholder!: string;
  @Input() onChange!: (ev: Event, varName: string) => any;
  @Input() onBlur!: (par: string) => any;
  @Input() autocomplete!: 'on' | 'off';
  @Input() autofocus: boolean = false;
  @Input() showSuggestionsCondition: boolean = false;
  @Input() id!: string;

  @ViewChild('appInput') input!: InputComponent;

  suggestions: string[] = [];
  query: string = '';

  constructor(private doppiatoriSrv: DoppiatoriService) {
    this.doppiatoriSrv.suggestions.subscribe((s) => (this.suggestions = s));
    this.doppiatoriSrv.query.subscribe((q) => (this.query = q));
  }
  emptySuggestions() {
    this.doppiatoriSrv.emptySuggestions('suggestions');
  }
  pickSuggestion(ev: Event) {
    const picked = this.doppiatoriSrv.pickSuggestion(ev);
    this.input.value = picked;
    setTimeout(() => {
      this.emptySuggestions();
    }, 500);
  }
  getSuggestions = (ev: Event) => {
    this.doppiatoriSrv.fetchSuggestions(ev, 'suggestions');
  };
}
