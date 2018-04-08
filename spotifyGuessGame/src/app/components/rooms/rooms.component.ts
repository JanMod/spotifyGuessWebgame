import { Component, OnInit } from '@angular/core';
import { RoomsServiceService } from '../../service/roomsService/rooms-service.service';
import { PipePipe } from '../../Pipes/pipe.pipe';
import { WarningDialogService } from '../../service/warning-dialog/warning-dialog.service';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {

  private rooms: any[] = [];
  private config: JSON;

  constructor(private roomService: RoomsServiceService, private warningDialog: WarningDialogService) {

  }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe(data => {
      data.forEach(element =>{
       this.rooms[element.id]  = element;
      })
    
    }, error => {
      console.log('error' + error);
    })

    this.roomService.getCurrentRoomsWS().subscribe(v => {
      if (!v.id) {
        return;
      }
      this.rooms[v.id] = v;
    }, error => {
      console.log('error' + error);
    })
  }

  join(id) {
    this.warningDialog.openDialog().subscribe(value => {
      if(value){
        this.roomService.joinRoom(id).subscribe(value =>{
          console.log(value);
          console.log("Joined room");
        }),
        error => {
       
        }
      }
    })}

}
