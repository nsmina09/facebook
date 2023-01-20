import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SideButtonsComponent } from './side-buttons/side-buttons.component';
import { UserListComponent } from './user-list/user-list.component';
import { EachMessageComponent } from './each-message/each-message.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OthersProfileComponent } from './others-profile/others-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { FilterPipe } from './pipes/filter.pipe';
import { MoreInfoComponent } from './more-info/more-info.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MessagesComponent,
    NotificationsComponent,
    SideButtonsComponent,
    UserListComponent,
    EachMessageComponent,
    MyProfileComponent,
    OthersProfileComponent,
    EditProfileComponent,
    AddPostComponent,
    FilterPipe,
    MoreInfoComponent,
    CommentsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
