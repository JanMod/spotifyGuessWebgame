import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage'

@Injectable()
export class UserService {
  private id: string;
  private roomId: string;
  private user: any;
  private token: string;
  constructor(private _localStService: LocalStorageService) { }

  setId(id) {
    this.id = id;
  }

  getId(): string {
    return this.user.id;
  }

  setUser(user) {
    this.user = user;
    if (this.user.token) {
      this._localStService.store('token', this.user.token);
    }
  }

  getUser(): JSON {
    return this.user;
  }

  getToken(): string {
    return this._localStService.retrieve('token');
  }

  addRoom(id) {
    console.log('user service: add Room:' + id);
    this.roomId = id;
  }

  getRoom() {
    return this.roomId;
  }

  getName() {
    return this.user.name;
  }

}
