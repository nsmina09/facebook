import { Injectable } from '@angular/core';
import {  BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   otheruser = new Subject()
   searchKey=new BehaviorSubject('');
   notlength=new BehaviorSubject(0)
   fullname=new BehaviorSubject('')
   id=new BehaviorSubject('')
   post=new BehaviorSubject({})

  constructor() { }

  getOtherUserInfo(user: any) {
     this.otheruser.next(user);
     console.log(this.otheruser);   
  }

}
