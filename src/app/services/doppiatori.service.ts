import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoppiatoriService {

  constructor(private http: HttpClient) {

  }

  public getSuggestions(query:string) {
    console.log(query)
    return this.http.get<string[]>(`${environment.url}doppiatori/suggestions?query=${encodeURI(query.toLowerCase())}`)
  }
}
