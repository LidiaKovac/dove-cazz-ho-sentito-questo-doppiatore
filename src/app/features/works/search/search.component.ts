import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query!: string | null;
  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('query') !== null) {
        this.query = params.get('query');
      }
    });
  }

  ngOnInit() {}
}
