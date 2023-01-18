import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(private router: Router, private db: DataService,private serservice:UserService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
  }

  gotoMyProfile() {
    this.router.navigate(['/my-profile', this.currentUser])
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('you');
    localStorage.removeItem('otheruser');
    this.db.logout(this.currentUser).subscribe((result: any) => {
      alert(result.message);
    }, result => {
      alert(result.error.message)
    })
    this.router.navigateByUrl('/')
  }

  search(event:any){
    let searchKey=event.target.value;
    this.serservice.searchKey.next(searchKey)
  }

}
