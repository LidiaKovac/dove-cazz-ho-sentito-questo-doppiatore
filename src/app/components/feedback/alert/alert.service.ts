import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import uniqid from "uniqid"

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alerts = new BehaviorSubject<Alert[]>([])

  constructor() { }

  public get alertList() {
    return this.alerts.asObservable();
  }

  public addAlert(alert: Alert["val"], type: Alert["type"]) {
    const current = this.alerts.getValue()
    current.push({ val: alert, id: uniqid(), type })
    this.alerts.next(current)
  }

  public deleteAlert(id: string) {
    const current = this.alerts.getValue()
    const toDelete = current.findIndex(al => al.id === id)
    if (toDelete !== -1) {
      current.splice(toDelete, 1)
    }
    this.alerts.next(current)
  }
}
