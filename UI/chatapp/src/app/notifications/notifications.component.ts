import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {


  public currentuser: any;
  public notification: any;
  public friendlist: any;


  constructor(private db: DataService) { }

  ngOnInit(): void {
    this.currentuser = JSON.parse(localStorage.getItem('currentUser') || '');
    console.log(this.currentuser);
    this.db.getNotifications(this.currentuser).subscribe((result: any) => {
      console.log(result.notifications);
      this.notification = result.notifications
    }, (error: any) => {
      console.log(error);
    })
  }


  confirm(not: any) {
    console.log(not);
    //add friend to my list
    let username = not.username;
    let fullname = not.fullname;
    let fromusername = not.fromusername;
    let id = not._id;

    let idin = `ObjectId('${id}')`
    console.log(idin);

    this.db.confirmRequest(username, fullname, fromusername).subscribe((result: any) => {
      console.log(result);
      alert(result.message)
    }, result => {
      console.log(result);
      alert(result.error.message)
    })

    //add friend to their list
    let myfullname = JSON.parse(localStorage.getItem('you') || '')[0].fullname
    this.db.confirmRequest(fromusername, myfullname, username).subscribe((result: any) => {
      console.log(result);

    }, result => {
      console.log(result);

    })

    this.db.deleterequest(idin).subscribe((result: any) => {
      console.log(result);
      alert(result.message)
    }, result => {
      console.log(result);
      alert(result.error.message)
    })
    window.location.reload()
  }

  delete(not: any) {
    let id = not._id;
    let idin = `ObjectId('${id}')`
    this.db.deleterequest(idin).subscribe((result: any) => {
      console.log(result);
      alert(result.message)
    }, result => {
      console.log(result);
      alert(result.error.message)
    })
    window.location.reload()
  }

}
