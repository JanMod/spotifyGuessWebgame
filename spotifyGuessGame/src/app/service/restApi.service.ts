import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core/src/metadata/directives';
import { UserService } from './user.service';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';



interface RoomsResponse {
    id: string;
    name: string;
    password: string;
    numberUser: number;
    max: number;
}
interface RoomsResponse extends Array<RoomsResponse>{}

interface JoinRoomResponse {
    id: string;
    user: JSON
}

interface createRoomResponse  {
    data : string;
    message : string;
}

@Injectable()

export class RestApiService {
    private data: JSON;
    private createRoomRoute: string;
    response: any;
    private socket;
    constructor(private http: HttpClient, private user: UserService) {
        this.socket = io.connect("http://192.168.178.61:8000/");
    }


    private subject: Rx.Subject<MessageEvent>;

    public connect(url): Rx.Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    public connectIO(): Rx.Observable<MessageEvent> {

        var _socket = this.socket;
        return Rx.Observable.fromEventPattern(data => {
            _socket.on('newRoom', data);
        }

        )

    }

    public connectUserWs(id): Rx.Observable<MessageEvent> {

        var _socket = this.socket;
        this.socket.emit('setUserWs', { id }, data => {

        });
        return Rx.Observable.fromEventPattern(data => {
            _socket.on(id, data);
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
        this.createRoomRoute = 'http://192.168.178.61:8000/api/createRoom';
    }

    createRoom(data) {
        let id = this.user.getId();
        return this.http.post<createRoomResponse>('http://192.168.178.61:8000/api/createRoom', {
            data: data,
            userid: id
        });
    }

    createUser(name) {
        return this.http.post('http://192.168.178.61:8000/api/createUser', name);
    }


    getRooms() {
        return this.http.get<RoomsResponse>('http://192.168.178.61:8000/api/Rooms');
    }

    joinRoom(id) {
        return this.http.post<JoinRoomResponse>('http://192.168.178.61:8000/api/joinRoom', { user: this.user.getUser(), id: id });
    }

    leaveRoom() {

    }

    checkUser(){
        
    }

    getSocket() {
        return this.socket;
    }

}

// 