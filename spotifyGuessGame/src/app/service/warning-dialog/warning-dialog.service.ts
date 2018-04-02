import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog-component/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
@Injectable()
export class WarningDialogService {
  dialogRef: MatDialogRef<DialogComponent>
  constructor(private dialog: MatDialog) { }


  openDialog() {
    console.log('openDialog');
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        text: "nichts",
        submit: "Join",
        decline: "dont"
      }
    });
    return this.dialogRef.afterClosed();
  }
}
