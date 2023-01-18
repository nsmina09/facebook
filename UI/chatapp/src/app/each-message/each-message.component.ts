import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-each-message',
  templateUrl: './each-message.component.html',
  styleUrls: ['./each-message.component.css']
})
export class EachMessageComponent implements OnInit {
  
  isActive=true;

  constructor() { }

  ngOnInit(): void {
  }

}
