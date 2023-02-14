import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})
export class SongComponent implements OnInit {
  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.connectSpotify();
  }
}
