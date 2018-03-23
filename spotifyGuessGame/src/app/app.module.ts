import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    CreateRoomComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
