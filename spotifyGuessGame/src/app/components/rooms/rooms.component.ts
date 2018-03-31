import { Component, OnInit } from '@angular/core';
import { RoomsServiceService } from '../../service/roomsService/rooms-service.service';
import { PipePipe } from '../../Pipes/pipe.pipe';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {

  private rooms: any[] = [];
  private config: JSON;

  constructor(private roomService: RoomsServiceService) {

  }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe(v => {
      console.log(v);
    }, error => {
      console.log('error' + error);
    })

    this.roomService.getCurrentRoomsWS().subscribe(v => {
      if(!v.id){
        return;
      }
      this.rooms[v.id] = v;
      console.log(this.rooms);
    }, error => {
      console.log('error' + error);
    })
  }

}
