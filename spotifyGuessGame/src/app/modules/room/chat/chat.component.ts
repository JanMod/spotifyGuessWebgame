import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private roomId;
  private messages: any[] = [];
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.connectChat(this.roomId).subscribe(message => {
      this.messages.push(message);
    },
      error => {
        console.log(error);
      }
    )
  }

}
