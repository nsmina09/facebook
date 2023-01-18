import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  //get my name from my profile component- parent to child communication
  @Input() public myname: any;

  //post text
  public postText: any;

  //to send datas like foto and text to my profile ie from child to parent
  @Output() public getTextEmitter = new EventEmitter();
  @Output() public getImageEmitter = new EventEmitter();

  getText(event: any) {
    this.getTextEmitter.emit(event.target.value);
  }
  
  processFile(imageInput: any) {
    this.getImageEmitter.emit(imageInput)
  }

  constructor() { }

  ngOnInit(): void {
  }
  
}
