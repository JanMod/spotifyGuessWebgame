import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { ChatComponent } from './chat/chat.component';

import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
//Service
import {ChatService} from './chat.service';
import {RestApiService} from '../../service/restApi.service';
import {UserService} from '../../service/user.service';
@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule
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
