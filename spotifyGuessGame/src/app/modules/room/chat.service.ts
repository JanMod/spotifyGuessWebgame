import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { RestApiService } from '../../service/restApi.service';
import { UserService } from '../../service/user.service';

@Injectable()
export class ChatService {

  private socket;
  private room: string;
  private connectSocket: Rx.Observable<MessageEvent>;
  constructor(private restApi: RestApiService, private user: UserService) {
    this.socket = this.restApi.getSocket();
  }

  connectChat(roomid): Rx.Observable<MessageEvent> {
    console.log('roomId:' + roomid);
    this.room = roomid;
    var _socket = this.socket;
    let id = this.room;
    this.connectSocket = Rx.Observable.fromEventPattern(data => {
      _socket.on('roomMessage', data);
    }
    )
    return this.connectSocket;
  }

  getChatSocket() {
    return this.connectSocket;
  }

  sendMessage(msg, type) {

    this.socket.emit(this.room, {
      type: type,
      message: msg,
      user: this.user.getUser()
    });
  }


}