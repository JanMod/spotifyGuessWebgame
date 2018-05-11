import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { RestApiService } from '../../service/restApi.service';
import { UserService } from '../../service/user.service';

@Injectable()
export class ChatService {

  private socket;

  constructor(private restApi: RestApiService, private user: UserService) {
    this.socket = this.restApi.getSocket();
  }

  connectChat(roomid): Rx.Observable<MessageEvent> {
    var _socket = this.socket;
    return Rx.Observable.fromEventPattern(data => {
      _socket.on('roomMessage', data);
    }
    )
  }

  sendMessage(msg) {
    
    this.socket.emit(this.user.getRoom(), {
      message: msg,
      user: this.user.getUser()
    });
  }


}