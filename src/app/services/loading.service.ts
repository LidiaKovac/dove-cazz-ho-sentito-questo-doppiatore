import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public $loading = new BehaviorSubject<boolean>(false)
  constructor() { }

  public set setLoading(val:boolean) {
    this.$loading.next(val)
  }
}
