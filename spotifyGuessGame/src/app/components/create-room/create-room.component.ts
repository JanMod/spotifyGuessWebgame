import { Component, OnInit, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { RestApiService } from '../../service/restApi.service';
import { ResponseSnackbarService } from '../../service/responseSnackbarService/response-snackbar.service';
@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})
export class CreateRoomComponent implements OnInit {
  dialogRef: MatDialogRef<DialogRoomForm>

  response: any;
  name: string;
  password: string;
  constructor(private dialog: MatDialog, private rest: RestApiService, private responseSnackBar: ResponseSnackbarService) {
  }

  ngOnInit() {
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogRoomForm, {
      data: {
        name: this.name,
        password: this.password
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.rest.createRoom(result).subscribe();
      }
     
    })
  }

  submit = function () {

  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogRoomForm {
  constructor(
    public dialogRef: MatDialogRef<DialogRoomForm>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.data);
  }

}
