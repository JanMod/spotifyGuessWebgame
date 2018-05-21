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
  private message: string;
  constructor(private chat: ChatService) { }

  ngOnInit() {
    console.log(this.chat.getChatSocket());
    this.chat.getChatSocket().subscribe(message => {
      console.log(message)
      this.messages.push(message);
    }
    )
  }

  connectChat(){
    
  }

  sendMessage(msg) {
    console.log(msg);
    var message = {
      name: 'me',
      message: msg,
      type: 'chat'
    }
    this.messages.push(message);
    this.chat.sendMessage(msg, 'chat');

  }

}
