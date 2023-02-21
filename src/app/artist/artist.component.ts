import { Artist } from './../models/Artist';
import { SpotifyHttpService } from '../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  inputArtist ?: string;
  artist ?: Artist | null = null;
  favoriteArtists ?: Artist[];
  jsonData : string | null = null;

  constructor(public httpService: SpotifyHttpService) {}

  async ngOnInit() {
    this.httpService.connectSpotify();

    this.jsonData = localStorage.getItem("favoriteArtists");
    if(this.jsonData != null){
      this.favoriteArtists = JSON.parse(this.jsonData);
    }
  }

  async searchArtist() : Promise<void> {
    this.artist = await this.httpService.getArtist(this.inputArtist);
    this.createFavoriteArtist();
  }

  createFavoriteArtist() : void {
    if (!this.artist) {
      return;
    }
    this.favoriteArtists?.push(new Artist(this.artist.id, this.artist.name, this.artist.imageUrl));
    this.saveFavoriteArtist();
  }

  saveFavoriteArtist() : void {
    localStorage.setItem("favoriteArtists", JSON.stringify(this.favoriteArtists));
  }

  afficherFavoriteArtist() : void {

  }

}
