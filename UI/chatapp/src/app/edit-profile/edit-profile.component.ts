import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public showBioEditInput: any = false
  public showHobbiesEditInput: any = false
  public showDescribeEditInput: any = false

  public bio: any;
  public maritalStatus: any
  public collage: any
  public school: any
  public hobbies: any
  public place: any

  //to send data to parent
  @Output() bioEmitter = new EventEmitter();
  @Output() schoolEmitter = new EventEmitter();
  @Output() collageEmitter = new EventEmitter()
  @Output() placeEmitter = new EventEmitter()
  @Output() hobbiesEmitter = new EventEmitter()
  @Output() maritalStatusEmitter = new EventEmitter()
  @Output() profilePicEmitter = new EventEmitter()
  @Output() coverPicEmitter = new EventEmitter()

  //data reciever from parent
  @Input() public oldbio :any
  @Input() public oldschool :any
  @Input() public oldcollage :any
  @Input() public oldplace :any
  @Input() public oldhobbies :any
  @Input() public oldcoverpic :any
  @Input() public oldprofilepic :any
  @Input() public oldmaritalstatus :any


  constructor() { }

  ngOnInit(): void {
  }

  getmaritalstatus() {
    this.maritalStatusEmitter.emit(this.maritalStatus)
  }

  getbio() {
    this.bioEmitter.emit(this.bio)
  }

  getschool() {
    this.schoolEmitter.emit(this.school)
  }

  getcollage() {
    this.collageEmitter.emit(this.collage)
  }

  getplace() {
    this.placeEmitter.emit(this.place)
  }

  gethobbies() {
    this.hobbiesEmitter.emit(this.hobbies)
  }


  processProfileImage(profile: any) {
    this.profilePicEmitter.emit(profile)
  }

  processCoverImage(coverImage: any) {
    this.coverPicEmitter.emit(coverImage)
  }

  bioEdit() {
    this.showBioEditInput = !this.showBioEditInput
  }

  describeEdit() {
    this.showDescribeEditInput = !this.showDescribeEditInput
  }

  hobbiesEdit() {
    this.showHobbiesEditInput = !this.showHobbiesEditInput
  }

}
