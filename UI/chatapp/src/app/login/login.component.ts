import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: any;
  public password: any;

  public errormessage: any = '';

  constructor(private router: Router, private db: DataService) { }

  ngOnInit(): void {
  }
  login() {
    this.errormessage = ''
    console.log(this.password, this.username);
    if (this.password == '' || this.username == '') {
      this.errormessage = 'Please enter your username and password'
    } else {
      this.db.login(this.username, this.password).subscribe((result: any) => {
        alert(result.message)
        console.log(result.currentUser);
        this.router.navigateByUrl('/home/home-feed');
        localStorage.setItem('currentUser', JSON.stringify(result.currentUser))
      },
        result => {
          this.errormessage = result.error.message;
        })
    }
  }
}
