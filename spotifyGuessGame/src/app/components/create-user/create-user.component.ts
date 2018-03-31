import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  private name:string;
  constructor() { }

  ngOnInit() {
  }

  submit(){
    console.log(this.name);
  }
}
