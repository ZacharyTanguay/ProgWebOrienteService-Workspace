import { Artist } from './../models/Artist';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/Album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  artistId ?: string | null = null;
  albumList: Album[] = [];


  constructor(public httpService: SpotifyService, public route : ActivatedRoute) { }

  ngOnInit(): void {
    this.httpService.connectSpotify();
    this.artistId = this.route.snapshot.paramMap.get('artistId');
    this.getAlbum();
  }

  async getAlbum() : Promise<void> {
    this.albumList = await this.httpService.getAlbums(this.artistId ?? "") ?? [];
  }

}
