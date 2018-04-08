import { Component, OnInit } from '@angular/core';
import { RoomsServiceService } from '../../service/roomsService/rooms-service.service';
import { PipePipe } from '../../Pipes/pipe.pipe';
import { WarningDialogService } from '../../service/warning-dialog/warning-dialog.service';
import { NavigationService } from '../../service/navigation.service';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {

  private rooms: any[] = [];
  private config: JSON;

  constructor(private roomService: RoomsServiceService, 
    private warningDialog: WarningDialogService, private navigation: NavigationService, private user: UserService) {

  }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe(data => {
      data.forEach(element => {
        this.rooms[element.id] = element;
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
      if (value) {
        this.roomService.joinRoom(id).subscribe(value => {
          console.log(value);
          this.user.addRoom(value.id);
          this.navigation.viewRoom(value.id);

        }),
          error => {

          }
      }
    })
  }

}
