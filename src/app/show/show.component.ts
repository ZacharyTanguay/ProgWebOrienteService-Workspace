import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  constructor(public httpService: SpotifyService) { }

  ngOnInit(): void {
    this.httpService.connectSpotify();
  }
}
