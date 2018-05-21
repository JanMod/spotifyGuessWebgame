import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { RestApiService } from '../../../service/restApi.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-room-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private roomConnected: boolean;
  constructor(private http: HttpClient, private user: UserService, private router: Router, private restApi: RestApiService, private chat: ChatService) {


    let roomId = this.router.url.split('/')[2];
    if (!this.user.getToken()) {
      this.restApi.getUser().subscribe(data => {
        this.user.setUser(data);
        this.joinRoom(roomId);
      }, err => {
        console.log(err);
      })
    } else {
      this.joinRoom(roomId);
    }



  }

  ngOnInit() {

  }

  joinRoom(roomId) {
    this.restApi.connectUserWs(this.user.getToken(), value => {
      this.http.post<any>('http://192.168.178.61:8000/api/joinRoom/' + roomId, { user: this.user.getUser() }).subscribe(data => {
        console.log(data);
        this.chat.connectChat(data.room);
        this.roomConnected = true;
      }, err => {
        this.roomConnected = false;
        console.error(err);
      })
    })
  }

}
