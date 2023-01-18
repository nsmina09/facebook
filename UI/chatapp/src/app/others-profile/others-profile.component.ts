import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.css']
})
export class OthersProfileComponent implements OnInit {

 
  public currentUsername: any;
  public currentUser: any;
  public profileerror = '';
  public localUser: any;
  public posterror: any = '';
  public otherspostlist: any
  public friends: any;
  public emptyFriendError: any = false;
  public otheruserfullname: any;
  public otheruserusername: any;
  public bio: any;
  public maritalStatus: any
  public collage: any
  public school: any
  public hobbies: any
  public place: any
  public profilePic: any;
  public coverPic: any
  public isAlreadyFriend:any;


  constructor(private userservice: UserService, private db: DataService) { }

  ngOnInit(): void {
    //get other username from subject
    this.userservice.otheruser.subscribe((user: any) => {
      this.currentUsername = user.username;
    });

    //get other user from locla storage
    this.localUser = localStorage.getItem('otheruser');

    // to get other profile info
    this.getOtherProfile();
    this.getOthersPost()


    //firend list
    this.db.getFriends(this.localUser).subscribe((result: any) => {
      this.friends = result.friends
      if (this.friends.length == 0) {
        this.emptyFriendError = true;
      }
    }, result => {
      console.log(result);
    })

    //get info of others profile


  }



  getOtherProfile() {
    this.db.getOtherProfile(this.localUser).subscribe((result: any) => {
      this.currentUser = result.other;
      this.otheruserfullname = this.currentUser.fullname
      this.otheruserusername = this.currentUser.username
      this.db.getInfo(this.otheruserusername).subscribe((result: any) => {
        console.log(result);
        if (result.info.length == 0) {
          this.bio == '';
          this.school == '';
          this.collage == '';
          this.maritalStatus == '';
          this.coverPic == '';
          this.profilePic == '';
          this.hobbies == '';
          this.place == '';
        } else {
          let info = result.info[0];
          this.bio = info.bio;
          this.school = info.school;
          this.collage = info.collage;
          this.maritalStatus = info.maritalStatus;
          this.coverPic = info.coverImage;
          this.profilePic = info.profileImageUrl;
          this.hobbies = info.hobbies;
          this.place = info.place;
        }
      }, result => {
        console.log(result);
      })
      this.profileerror = '';
      this.checkFriendship();
    }, result => {
      this.profileerror = result.error.mrssage
    })
  }

  getOthersPost() {
    this.db.getOthersPost(this.localUser).subscribe((result: any) => {
      this.otherspostlist = result.others.postImageUrls
      this.posterror = ''
    }, result => {
      this.posterror = 'No posts'
    })
  }

  checkFriendship() {
    let urusername = JSON.parse(localStorage.getItem('currentUser') || '');
    console.log(urusername);
    console.log(this.otheruserfullname);
    console.log(this.otheruserusername);
    this.db.alreadyFriend(urusername, this.otheruserfullname, this.otheruserusername).subscribe((result: any) => {
      console.log(result.alreadyFriend);
      this.isAlreadyFriend=result.alreadyFriend;
    }, result => {
      console.log(result);
    })
  }

  addfriend() {
    let fromusername = JSON.parse(localStorage.getItem('you') || '')[0].fullname;
    let fromuser = JSON.parse(localStorage.getItem('currentUser') || '')
    let tousername = localStorage.getItem('otheruser');
    console.log(fromusername);
    console.log(tousername);
    let date = new Date();
    this.db.addFriend(fromusername, tousername, date, fromuser).subscribe((result: any) => {
      alert(result.message)
    },
      result => {
        console.log(result);
      })
  }

}
