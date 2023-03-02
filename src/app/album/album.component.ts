import { Artist } from './../models/Artist';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Album } from '../models/Album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  artistId ?: string | null = null;
  albumList: Album[] = [];
  artistName ?: string | null = null;


  constructor(public httpService: SpotifyService, public route : ActivatedRoute) { }

  ngOnInit(): void {
    this.httpService.connectSpotify();
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.artistId = params.get("artistId");
      this.getAlbum();
     });
  }

  async getAlbum() : Promise<void> {
    this.albumList = await this.httpService.getAlbums(this.artistId ?? "") ?? [];
    this.artistName = (await this.httpService.getArtistById(this.artistId ?? ""))?.name;
    console.log(this.albumList);
  }

}
