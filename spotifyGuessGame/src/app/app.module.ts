import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { CreateRoomComponent, DialogRoomForm } from './components/create-room/create-room.component';

import { CreateSnackBar } from './service/responseSnackbarService/response-snackbar.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatProgressSpinnerModule } from '@angular/material'
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';


//Service
import { RestApiService } from './service/restApi.service';
import { ResponseSnackbarService } from './service/responseSnackbarService/response-snackbar.service';
import { RoomsServiceService } from './service/roomsService/rooms-service.service';
import { PipePipe } from './Pipes/pipe.pipe';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserService } from './service/user.service';
import { DialogComponent } from './service/warning-dialog/dialog-component/dialog/dialog.component';
import { WarningDialogService } from './service/warning-dialog/warning-dialog.service';
import { GameRoomComponent } from './components/game-room/game-room.component';
import { NavigationService } from './service/navigation.service'
//Modules
import { RoomModule } from './modules/room/room.module';

const appRoutes: Routes = [
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'room/:id',
    component: GameRoomComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  { path: '**', component: CreateUserComponent }
]



@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    CreateRoomComponent,
    DialogRoomForm,
    CreateSnackBar,
    PipePipe,
    CreateUserComponent,
    DialogComponent,
    GameRoomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    RoomModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  entryComponents: [DialogRoomForm, CreateSnackBar, DialogComponent],
  providers: [
    RestApiService,
    ResponseSnackbarService,
    RoomsServiceService,
    UserService,
    WarningDialogService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
