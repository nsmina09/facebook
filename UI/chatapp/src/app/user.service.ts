import { Injectable } from '@angular/core';
import {  BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   otheruser = new Subject()
   searchKey=new BehaviorSubject('');

  constructor() { }

  getOtherUserInfo(user: any) {
     this.otheruser.next(user);
     console.log(this.otheruser);   
  }

}
