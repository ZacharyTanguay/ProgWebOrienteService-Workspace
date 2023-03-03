import { SpotifyService } from '../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Song } from '../models/Song';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoogleService } from '../services/google.service';

const youtubeURL = "https://www.youtube.com/embed/";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})
export class SongComponent implements OnInit {
  artistId ?: string | null = null;
  artistName ?: string | null = null;
  albumName ?: string | null = null;
  songList: Song[] = [];
  songName : string = "";
  videoUrl ?: SafeResourceUrl;


  constructor(public httpService: SpotifyService, public route : ActivatedRoute, public sanitizer : DomSanitizer, public google : GoogleService) { }

  ngOnInit(): void {
    this.httpService.connectSpotify();
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.artistId = params.get("artistId");
      this.artistName = params.get("artistName");
      this.albumName = params.get("albumName");
      this.getSong();
     });
  }

  async getSong() : Promise<void> {
    this.songList = await this.httpService.getSongs(this.artistId ?? "") ?? [];
    console.log(this.songList);
  }

  async searchVideo(songName : string):Promise<void>{
    this.songName = await this.google.searchVideoId(this.artistName + " " + songName);
    console.log(this.songName);
    this.getSafeUrl();
  }

  getSafeUrl() : SafeResourceUrl{
    console.log(this.songName);
    return this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeURL + this.songName);
  }



}
