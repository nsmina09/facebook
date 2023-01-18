import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.css']
})
export class HomeFeedComponent implements OnInit {

  public userPosts: any;
  public emptyError=false;
  constructor(private db: DataService) {
   
   }

  ngOnInit(): void {
    this.db.getAllPost().subscribe((result: any) => {

      this.userPosts = result.userandposts.reverse()
       if(this.userPosts.length==0){
        this.emptyError=true
       }
      console.log(this.userPosts, 'all posts');

    }, result => {
      console.log(result);
      
    })
  }

}
