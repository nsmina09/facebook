import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.css']
})
export class HomeFeedComponent implements OnInit {

  public userPosts: any;
  public emptyError = false;
  public notificationlength: any;

  constructor(private db: DataService, private userservice: UserService, private router: Router) {

  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentUser') || '')
    this.db.getNotifications(user).subscribe((result: any) => {
      this.notificationlength = result.notifications.length
      console.log(this.notificationlength);
      this.userservice.notlength.next(this.notificationlength)
    }, (error: any) => {
      console.log(error);
    })
    this.db.getAllPost().subscribe((result: any) => {
      this.userPosts = result.userandposts.reverse()
      if (this.userPosts.length == 0) {
        this.emptyError = true
      }
      console.log(this.userPosts, 'all posts');
    }, result => {
      console.log(result);

    })
  }

  gotoComment(post: any) {
    this.router.navigateByUrl('/comments');
    let fullname =JSON.parse(localStorage.getItem('you')||'')[0].fullname;
    console.log(post);
    this.userservice.post.next(post)
      this.userservice.id.next(post.id)
      this.userservice.fullname.next(fullname)
  }
}
