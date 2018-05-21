import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../service/user.service';
import { SpotifyRestService } from '../../modules/spotify-api/spotify-rest.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private user: UserService, private spotify: SpotifyRestService) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit() {
  }

  fullscreenApp() {
    document.body.webkitRequestFullscreen();
  }

  spotifyAuth() {
    window.location.href = 'http://192.168.178.61:8000/api/spotify/auth/' + this.user.getId();
    //this.spotify.authorize();
  }

}
