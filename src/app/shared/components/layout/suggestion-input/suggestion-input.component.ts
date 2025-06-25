import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';

import { FormsModule } from '@angular/forms';
import { DoppiatoriService } from 'src/app/features/doppiatori/doppiatori.service';
import { tap } from 'rxjs';

@Component({
    selector: 'app-suggestion-input',
    templateUrl: './suggestion-input.component.html',
    styleUrls: ['./suggestion-input.component.scss'],
    imports: [FormsModule, InputComponent]
})
export class SuggestionInputComponent implements OnInit {
  [key: string]: any;
  @Input() dataSuggestionsVar!: string;
  @Input() placeholder!: string;
  @Input() autocomplete!: 'on' | 'off';
  @Input() autofocus: boolean = false;
  @Input() id!: string;
  @Input() name!: string;
  loadingMsg: string = "Warming up the data"
  shouldShow: boolean = false

  @ViewChild('appInput') input!: InputComponent;

  suggestions: string[] = [];
  query: string = '';

  constructor(private readonly doppiatoriSrv: DoppiatoriService) {
    this.doppiatoriSrv.suggestions.subscribe((s) => (this.suggestions = s));
    this.doppiatoriSrv.query.subscribe((q) => (this.query = q));
  }

  ngOnInit(): void {
    this.doppiatoriSrv[this.dataSuggestionsVar].subscribe(
      (res: string[]) => (this.suggestions = res),
    );
  }
  emptySuggestions = () => {
    this.doppiatoriSrv.emptySuggestions(this.dataSuggestionsVar);
  };
  pickSuggestion = (ev: Event) => {
    const picked = this.doppiatoriSrv.pickSuggestion(ev);
    this.input.value = picked;
    this.shouldShow = false
    setTimeout(() => {
      this.emptySuggestions();
    }, 500);
  };
  getSuggestions = (ev: Event) => {
    this.doppiatoriSrv.fetchSuggestions(ev, this.dataSuggestionsVar).pipe(tap(() => this.shouldShow = true)).subscribe();
  };

}
