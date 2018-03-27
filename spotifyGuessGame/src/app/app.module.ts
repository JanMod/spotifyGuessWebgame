import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { CreateRoomComponent,DialogRoomForm } from './components/create-room/create-room.component';

import {CreateSnackBar} from './service/responseSnackbarService/response-snackbar.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule, MatProgressSpinnerModule} from '@angular/material'
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


//Service
import {RestApiService} from './service/restApi.service';
import {ResponseSnackbarService} from './service/responseSnackbarService/response-snackbar.service';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    CreateRoomComponent,
    DialogRoomForm,
    CreateSnackBar
  ],
  imports: [
    BrowserModule,
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
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  entryComponents:[DialogRoomForm , CreateSnackBar],
  providers: [RestApiService,ResponseSnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
