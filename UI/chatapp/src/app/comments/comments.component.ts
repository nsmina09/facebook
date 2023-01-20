import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public comment: any
  public id: any;
  public fullname: any;
  public comments: any
  public post: any
  public emptyplaceholder:any=false

  constructor(private userservice: UserService, private db: DataService) { }

  ngOnInit(): void {
    this.userservice.post.subscribe(data => {
      this.post = data;
    })
    this.userservice.id.subscribe(data => {
      this.id = data
      console.log(this.id);
    })
    this.userservice.fullname.subscribe(data => {
      this.fullname = data
      console.log('fullname', this.fullname);
    })

    this.db.getcomments(this.id).subscribe((result: any) => {
      console.log(result);
      this.comments = result.comment
    }, result => {
      console.log(result);
    })
  }

  postComment() {
    console.log(this.comment);
    if (this.comment != null) {
      this.db.addComment(this.id, this.fullname, this.comment).subscribe((result: any) => {
        this.comments = result.comment
        this.emptyplaceholder=true;
      }, result => {
        console.log(result);
      })
    }

  }

}
