import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {

  constructor(private router:Router) { }

  viewCreateUser(){
    this.router.navigate(['/'], {replaceUrl: false});
  }

  viewRooms(){
    this.router.navigate(['/rooms'], {replaceUrl: false});
  }

  viewRoom(id){
    this.router.navigate(['/room', id], {replaceUrl: false});
  }
}
