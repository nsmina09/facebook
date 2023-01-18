import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  register(fullname: any, gender: any, birthday: any, username: any, phoneNumber: any, password: any,) {
    let data = {
      fullname,
      gender,
      birthday,
      username,
      phoneNumber,
      password
    };
    return this.http.post('http://localhost:3000/register', data);
  }

  login(username: any, password: any,) {
    let data = {
      username,
      password
    };
    return this.http.post('http://localhost:3000/login', data);
  }

  getUsersList() {
    return this.http.get('http://localhost:3000/get-user-list');
  }

  getMyProfile(username: any) {

    return this.http.get('http://localhost:3000/my-profile/' + username)
  }

  addPost(username: any, fullname: any, text: any, imageurl: any, dateofPost: any) {
    let data = {
      username,
      fullname,
      text,
      imageurl,
      dateofPost
    };
    return this.http.post('http://localhost:3000/add-post', data);
  }

  getAllPost() {
    return this.http.get('http://localhost:3000/home-feed');
  }

  getMyPost(username: any) {
    return this.http.get('http://localhost:3000/my-feed/' + username)
  }

  logout(username: any) {
    let data = {
      username: username
    };
    return this.http.post('http://localhost:3000/logout', data);
  }

  getOtherProfile(username: any) {
    let data = {
      username: username
    }
    return this.http.post('http://localhost:3000/others-profile', data);
  }

  getOthersPost(username: any) {
    let data = {
      username: username
    }
    return this.http.post('http://localhost:3000/others-post', data);
  }

  addFriend(fromusername: any, username: any, date: any, fromuser: any) {
    let data = {
      fromusername: fromusername,
      username: username,
      date: date,
      fromuser: fromuser
    }
    return this.http.post('http://localhost:3000/add-friend', data)
  }

  getNotifications(username: any) {
    return this.http.get('http://localhost:3000/notifications/' + username);
  }

  confirmRequest(username: any, fullname: any, otheruser: any) {
    let data = {
      username: username,
      fullname: fullname,
      otheruser: otheruser
    }
    return this.http.put('http://localhost:3000/confirm', data)
  }

  deleterequest(id: any) {
    return this.http.delete('http://localhost:3000/delete/' + id)
  }


  getFriends(username: any) {
    return this.http.get('http://localhost:3000/friends/' + username);
  }

  addInfo(username: any, bio: any, school: any, collage: any, place: any, maritalStatus: any, coverImage: any, profileImageUrl: any) {
    let data = {
      username: username,
      bio: bio,
      school: school,
      collage: collage,
      place: place,
      maritalStatus: maritalStatus,
      coverImage: coverImage,
      profileImageUrl: profileImageUrl
    }
    return this.http.post('http://localhost:3000/add-info', data)
  }

  getInfo(username: any) {
    return this.http.get('http://localhost:3000/get-info/' + username);
  }

  alreadyFriend(username: any, fullname: any, otheruser: any){
    let data = {
      username: username,
      fullname: fullname,
      otheruser: otheruser
    }
    return this.http.post('http://localhost:3000/check-friend', data)
  }

}
