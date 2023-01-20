import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { CommentsComponent } from './comments/comments.component';
import { EachMessageComponent } from './each-message/each-message.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { MoreInfoComponent } from './more-info/more-info.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { OthersProfileComponent } from './others-profile/others-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '', component: LoginComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'each-message', component: EachMessageComponent },
  { path: 'my-profile/:username', component: MyProfileComponent },
  { path: 'others-profile/:username', component: OthersProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'more-info', component: MoreInfoComponent },
  { path: 'comments', component: CommentsComponent },
   { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
