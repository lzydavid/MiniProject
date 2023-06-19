import { Injectable,OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  previousUrlObs: Observable<string> = this.previousUrl.asObservable();
  constructor() { }
  // Set updated value
  setPreviousUrl(previousURL: string) {
    this.previousUrl.next(previousURL);
  }
}
