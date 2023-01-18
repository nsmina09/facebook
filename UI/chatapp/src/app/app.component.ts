import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatapp';
  header:any= false;

  constructor(private router: Router) {

  }

  //NavigationEnd -An event triggered when a navigation ends successfully. 
  // class NavigationEnd extends RouterEvent { constructor(id: number, url: string, urlAfterRedirects: string) type: EventType.

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // console.log(event);

        if (event.url == '/' || event.url == '/register') {
          this.header = false;
        } else {
          this.header = true;
        }
        // console.log(this.header);
      }
    })
  }

}
