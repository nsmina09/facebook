import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userlist: any;
  currentUser: any;
  searchTerm: any;

  constructor(private db: DataService, private router: Router, private user: UserService) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
    // console.log(this.currentUser, 'user in local storage');

    this.db.getUsersList().subscribe((result: any) => {
      // to get all the users using app
      this.userlist = result.userlist;
      // console.log(this.userlist, 'users in app');
      this.userlist.map((item: any, index: any) => {

        // to get user list other than you
        if (this.currentUser == item.username) {
          let you = this.userlist.splice(index, 1);
          // console.log(this.userlist, 'userlist without you');
          localStorage.setItem('you', JSON.stringify(you));
        }
      })

    }, result => {
      console.log(result);
    })

    this.user.searchKey.subscribe((data: any) => {
      this.searchTerm = data;
    })
  }

  //goto my profilr
  gotoMyProfile() {
    this.router.navigate(['/my-profile', this.currentUser])

  }

  //to get othrt user to goto others profile
  getOtherUserInfo(user: any) {
    localStorage.setItem('otheruser', user.username);
    //for behaviour subject
    this.user.getOtherUserInfo(user);
    let username = user.username;
    this.router.navigate(['/others-profile', username])
    // window.location.reload()
  }



}
