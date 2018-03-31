import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core/src/metadata/directives';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Injectable()

export class RestApiService {

    private createRoomRoute: string;
    response: any;
    private socket;
    constructor(private http: HttpClient) {
    }


    private subject: Rx.Subject<MessageEvent>;

    public connect(url): Rx.Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    public connectIO (url): Rx.Observable<MessageEvent>{
        this.socket = io.connect(url);
        var _socket = this.socket;
        return Rx.Observable.fromEventPattern( data =>{
            _socket.on('newRoom', data);
        }
            
        )
      
    }



    private create(url): Rx.Subject<MessageEvent> {
        let ws = new WebSocket(url);

        let observable = Rx.Observable.create(
            (obs: Rx.Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            })
        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        }
        return Rx.Subject.create(observer, observable);
    }

    ngOnInit() {
        this.createRoomRoute = 'api/createRoom';
    }

    createRoom(data) {
        return this.http.post('http://localhost:8000/api/createRoom', data);
    }

    getRooms(){
        return this.http.get('http://localhost:8000/api/Rooms');
    }

    leaveRoom() {

    }

}

// 