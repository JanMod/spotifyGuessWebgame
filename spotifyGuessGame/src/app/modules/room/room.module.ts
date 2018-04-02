import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ViewComponent,
    ChatComponent
  ]
})
export class RoomModule { }
