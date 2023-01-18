import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public currentUser: any;
  public yourdataArray: any;
  public dateofPost: any;
  public myPosts: any;
  public friends: any;
  public emptyFriendError: any = false;

  //data to be send to add post
  public myName: any;

  //data from child component add post
  public text: any
  public imageUrl: any;

  //data from child component edit profile
  public bio: any;
  public maritalStatus: any
  public collage: any
  public school: any
  public hobbies: any
  public place: any
  public profilePic: any;
  public coverPic: any

  constructor(private db: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentUser = params.get('username')
    });
    console.log('user from url', this.currentUser);

    //get profile info
    this.db.getMyProfile(this.currentUser).subscribe((result: any) => {
      console.log('you are', result.you);
      this.yourdataArray = result.you;
      this.myName = this.yourdataArray.fullname
    }, result => {
      console.log(result);
    })

    //get my posts
    this.db.getMyPost(this.currentUser).subscribe((result: any) => {
      console.log('my posts');
      this.myPosts = result.mypost.postImageUrls.reverse();
      console.log(result.mypost.postImageUrls);
    }, result => {
      console.log(result);
    })

    //firend list
    this.db.getFriends(this.currentUser).subscribe((result: any) => {
      console.log(result);
      this.friends = result.friends
      if (this.friends.length == 0) {
        this.emptyFriendError = true
      }
    }, result => {
      console.log(result);
    })

    //to get info 
    this.db.getInfo(this.currentUser).subscribe((result: any) => {
      let info = result.info[0]
      this.bio = info.bio
      this.collage = info.collage
      this.coverPic = info.coverImage
      this.maritalStatus = info.maritalStatus
      this.place = info.place
      this.profilePic = info.profileImageUrl
      this.school = info.school
      console.log(this.profilePic);

      console.log(info);
    }, result => {
      console.log(result);
    })

  }

  //to get datas from add post child component
  getText(event: any) {
    this.text = event;
  }

  getImage(event: any) {
    this.imageUrl = event;
  }

  //get data from edit profile child

  getbio(event: any) {
    console.log(event);
    this.bio = event
  }
  getschool(event: any) {
    this.school = event
    console.log(event);
  }
  getcollage(event: any) {
    this.collage = event
    console.log(event);
  }
  getplace(event: any) {
    this.place = event
    console.log(event);
  }
  gethobbies(event: any) {
    this.hobbies = event
    console.log(event);
  }
  getmaritalstatus(event: any) {
    this.maritalStatus = event
    console.log(event);
  }
  getprofilepic(event: any) {
    this.profilePic = event
    console.log(event);
  }
  getcoverpic(event: any) {
    this.coverPic = event
    console.log(event);
  }

  //add post button
  addPost() {
    if (this.imageUrl != null) {
      //to get post uploading date
      this.dateofPost = new Date();
      // let url = this.imageUrl;
      let url = 'data:image/jpeg;base64,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';
      this.db.addPost(this.currentUser, this.myName, this.text, url, this.dateofPost).subscribe((result: any) => {
        console.log(result);
        window.location.reload()
        this.router.navigate(['/my-profile', this.currentUser])
      }, result => {
        console.log(result);
      })
    }
    else {
      this.router.navigate(['/my-profile', this.currentUser])
    }
  }

  //goto more info page
  gotoMoreInfo() {
    this.router.navigateByUrl('/more-info')
  }

  //edit profile submission
  submitProfile() {
    let covpic = 'data:image/jpeg;base64,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'
    let profPic = 'data:image/jpeg;base64,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'
    this.db.addInfo(this.currentUser, this.bio, this.school, this.collage, this.place, this.maritalStatus, covpic, profPic).subscribe((result: any) => {
      console.log(result);
      alert(result.message)
    }, result => {
      console.log(result);
    })
  }

}