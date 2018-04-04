import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { ChatComponent } from './chat/chat.component';

import { MatListModule } from '@angular/material/list';

//Service
import {ChatService} from './chat.service';
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
    ChatService
  ]
})
export class RoomModule { }
