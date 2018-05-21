import { Injectable, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';


@Injectable()
export class ResponseSnackbarService {

  constructor(public matSnack: MatSnackBar) { }
  openSnackBar(response) {
    this.matSnack.openFromComponent(CreateSnackBar, {
      duration: 3000,
      data: response
    });
  }
}



@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component.html',
  styleUrls: ['./snack-bar.css']
})

export class CreateSnackBar {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
  ngOnInit() {
    console.log(this.data)
  }
}
