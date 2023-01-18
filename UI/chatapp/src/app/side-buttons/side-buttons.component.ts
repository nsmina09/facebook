import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-side-buttons',
  templateUrl: './side-buttons.component.html',
  styleUrls: ['./side-buttons.component.css']
})
export class SideButtonsComponent implements OnInit {
  currentUser: any;
  you:any;
  fullname:any

  constructor(private router: Router,private db:DataService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')||"");
    this.db.getMyProfile(this.currentUser).subscribe((result:any)=>{
      this.you=result.you;
      this.fullname=this.you.fullname
    })

  }


  gotoMyProfile(){
    this.router.navigate(['/my-profile',this.currentUser])
  }

}
