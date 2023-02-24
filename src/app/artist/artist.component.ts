import { Artist } from './../models/Artist';
import { SpotifyService } from '../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  inputArtist ?: string;
  artist ?: Artist | null = null;
  favoriteArtists ?: Artist[] = [];
  jsonData : string | null = null;

  constructor(public httpService: SpotifyService) {}

  ngOnInit() {
    this.httpService.connectSpotify();

    this.jsonData = localStorage.getItem("favoriteArtists");
    if(this.jsonData != null){
      this.favoriteArtists = JSON.parse(this.jsonData);
    }
  }

  async searchArtist() : Promise<void> {
    if (!this.inputArtist) {
      return;
    }
    this.artist = await this.httpService.getArtist(this.inputArtist);
    this.createFavoriteArtist();
  }

  createFavoriteArtist() : void {
    if (!this.artist || this.favoriteArtists?.find((x) => x.id === this.artist?.id)) {
      return;
    }
    this.favoriteArtists?.push(new Artist(this.artist.id, this.artist.name, this.artist.imageUrl));
    this.saveFavoriteArtist();
  }


  clearFavoriteArtist() : void {
    this.favoriteArtists = [];
    this.saveFavoriteArtist();
  }

  saveFavoriteArtist() : void {
    localStorage.setItem("favoriteArtists", JSON.stringify(this.favoriteArtists));
  }

}
