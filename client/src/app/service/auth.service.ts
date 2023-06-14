import { Injectable } from '@angular/core';
import { UserAccount } from '../model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  isLoggedIn:boolean = false
  currentUser!:UserAccount

  constructor() { }

  public updateLoggedStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
}
