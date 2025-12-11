import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';

import { FormsModule } from '@angular/forms';
import { DoppiatoriService } from 'src/app/features/doppiatori/doppiatori.service';

@Component({
  selector: 'app-suggestion-input',
  templateUrl: './suggestion-input.component.html',
  styleUrls: ['./suggestion-input.component.scss'],
  imports: [FormsModule, InputComponent],
})
export class SuggestionInputComponent implements OnInit {
  [key: string]: any;
  @Input() placeholder!: string;
  @Input() autocomplete!: 'on' | 'off';
  @Input() autofocus: boolean = false;
  @Input() id!: string;
  @Input() name!: string;

  @ViewChild('appInput') input!: InputComponent;
  @ViewChild('datalist') datalist!: HTMLDataListElement;

  suggestions: { id: string; title: string }[] = [];
  query: string = '';

  timeout!: number;

  constructor(private readonly doppiatoriSrv: DoppiatoriService) {
    this.doppiatoriSrv.suggestions.subscribe((s) => (this.suggestions = s));
  }

  ngOnInit(): void {
    this.datalist ? (this.datalist.style.background = 'white') : '';
  }

  getSuggestions = (ev: Event) => {
    if (this.timeout) clearTimeout(this.timeout);
    const value = (ev.target as HTMLInputElement).value;
    const id = (ev.target as HTMLInputElement).id;
    if (id == 'work') this.doppiatoriSrv.workQuery.next(value);
    if (id == 'compareTo') this.doppiatoriSrv.compareToQuery.next(value);
  };
}
