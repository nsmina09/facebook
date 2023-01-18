import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeFeedComponent } from './home-feed/home-feed.component';






@NgModule({
    declarations: [
        HomeComponent,
        HomeFeedComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,    
    ]
})
export class HomeModule { }
