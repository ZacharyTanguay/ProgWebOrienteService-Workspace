import { BandsintownService, ShowResponse } from './../services/bandsintown.service';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  artistName?: string | null = null;
  showList: ShowResponse[] = [];
  markerPositions : google.maps.LatLngLiteral[] = [];
  
  constructor(public httpService: BandsintownService, public route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.artistName = params.get("artistName");
      this.getArtist();
     });
  }

  async getArtist() : Promise<void> {
    this.showList = await this.httpService.getArtist(this.artistName ?? "");
    console.log(this.showList);
    for(let x of this.showList){
      this.markerPositions.push({lat: + x.venue.latitude, lng: + x.venue.longitude});
    }
    console.log(this.markerPositions);
  }

}
