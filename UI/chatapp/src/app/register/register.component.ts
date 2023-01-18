import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //values for registration
  public fullname: any;
  public birthday: any;
  public username: any;
  public password: any;
  public phoneNumber: any;
  public gender: any;

  //form validation error message
  public errormessage: string = '';
  public anyerror=false;

  //to set max date in calender
  getmax(){
    return new Date().toISOString().split('T')[0];
  }

  constructor(private router: Router, private fb: FormBuilder, private db: DataService) { }

  ngOnInit(): void { }

  registerForm = this.fb.group({
    fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    username: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.required]],
    password: ['', [Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required]],
    birthday: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    phoneNumber: ['', [Validators.pattern('[0-9]*'), Validators.required]],
  })

  submit() {
    this.errormessage = '';
    this.anyerror=false;
    if (this.registerForm.valid) {
      this.birthday = this.registerForm.value.birthday;
      this.fullname = this.registerForm.value.fullname;
      this.gender = this.registerForm.value.gender;
      this.username = this.registerForm.value.username;
      this.password = this.registerForm.value.password;
      this.phoneNumber = this.registerForm.value.phoneNumber;
      console.log(this.gender);
      console.log(this.birthday);
      console.log(this.username);
      console.log(this.password);
      console.log(this.phoneNumber);
      console.log(this.fullname);
      this.db.register(this.fullname, this.gender, this.birthday, this.username, this.phoneNumber, this.password,).subscribe((result: any) => {
        alert(result.message);
        this.router.navigateByUrl('/')
        this.errormessage = '';
        this.anyerror=false;
      }, result => {
        alert(result.error.message)
      })
    } else {
      this.errormessage = 'Please fill all the fields';
     
    }
  }


}
