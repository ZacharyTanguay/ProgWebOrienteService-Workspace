import { SpotifyService } from '../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Song } from '../models/Song';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})
export class SongComponent implements OnInit {
  artistId ?: string | null = null;
  albumName ?: string | null = null;
  songList: Song[] = [];

  constructor(public httpService: SpotifyService, public route : ActivatedRoute) { }

  ngOnInit(): void {
    this.httpService.connectSpotify();
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.artistId = params.get("artistId");
      this.getSong();
     });
  }

  async getSong() : Promise<void> {
    this.songList = await this.httpService.getSongs(this.artistId ?? "") ?? [];
    console.log(this.songList);
  }
}
