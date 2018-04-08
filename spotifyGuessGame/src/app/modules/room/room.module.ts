import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { ChatComponent } from './chat/chat.component';

import { MatListModule } from '@angular/material/list';

//Service
import {ChatService} from './chat.service';
import {RestApiService} from '../../service/restApi.service';
import {UserService} from '../../service/user.service';
@NgModule({
  imports: [
    CommonModule,
    MatListModule
  ],
  declarations: [
    ViewComponent,
    ChatComponent
  ],
  exports: [
    ViewComponent
  ],
  providers:[
    ChatService,
    RestApiService,
    UserService
  ]
})
export class RoomModule { }
