import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyComponentComponent } from './spotify-component/spotify-component.component';
import { SpotifyRestService } from './spotify-rest.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpotifyComponentComponent],
  providers: [
    SpotifyRestService
  ]
})
export class SpotifyApiModule { }
