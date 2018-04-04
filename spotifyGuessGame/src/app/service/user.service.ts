import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private id:string;
  private user:any
  constructor() { }

  setId(id){
    this.id =id;
  }

  getId():string{
    return this.user.id;
  }

  setUser(user){
    this.user = user;
  }

  getUser():JSON{
    return this.user;
  }
}
