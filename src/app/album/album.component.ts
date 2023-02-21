import { Component, OnInit } from '@angular/core';
import { SpotifyHttpService } from '../services/spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor(public httpService: SpotifyHttpService) { }

  ngOnInit(): void {
    this.httpService.connectSpotify();
  }

}
