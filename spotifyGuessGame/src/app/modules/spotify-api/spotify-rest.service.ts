import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class SpotifyRestService {
  private config: any;
  constructor(private http: HttpClient) {

  }



  authorize(userid) {
    this.http.get('http://192.168.178.61:8000/api/spotifyAuth', {
      params: {
        id: userid
      }
    })
  }

  playSong(id) {

  }

  pause() {

  }

  resume() {

  }
}
