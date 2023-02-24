import { Artist } from './../models/Artist';
import { Component, OnInit } from '@angular/core';
import { SpotifyHttpService } from '../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/Album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  artistId : string | null = null;
  album : Album[] | null = null;

  constructor(public httpService: SpotifyHttpService, public route : ActivatedRoute) { }

  ngOnInit(): void {
    this.httpService.connectSpotify();
    this.artistId = this.route.snapshot.paramMap.get('artistId');
  }

  async getAlbum() : Promise<void> {
    if (!this.artistId) {
      return;
    }

    this.album = await this.httpService.getAlbums(this.artistId);
  }

}
