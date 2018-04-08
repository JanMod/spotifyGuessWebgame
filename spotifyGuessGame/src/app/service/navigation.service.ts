import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {

  constructor(private router:Router) { }

  viewCreateUser(){
    this.router.navigate(['/'], {replaceUrl: true});
  }

  viewRooms(){
    this.router.navigate(['/rooms'], {replaceUrl: true});
  }

  viewRoom(id){
    this.router.navigate(['/rooms', id], {replaceUrl: true});
  }
}
