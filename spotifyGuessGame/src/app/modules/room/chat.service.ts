import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {

  private socket;

  constructor() { }

  public connectChat(roomid): Rx.Observable<MessageEvent> {
    this.socket = io.connect('localhost:8000');
    var _socket = this.socket;
    return Rx.Observable.fromEventPattern(data => {
      _socket.on(roomid, data);
    }

    )

  }
}