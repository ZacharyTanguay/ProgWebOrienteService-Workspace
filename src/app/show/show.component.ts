import { BandsintownService, ShowResponse } from './../services/bandsintown.service';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  artistName?: string | null = null;
  showList: ShowResponse[] = [];
  markerPositions : google.maps.LatLngLiteral[] = [];
  language : string | undefined;
  
  constructor(public httpService: BandsintownService, public route : ActivatedRoute, public translator : TranslateService) { }

  async ngOnInit(): Promise<void>	 {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.artistName = params.get("artistName");
      this.getArtist();
     });
     
     this.language = this.translator.currentLang;

     this.translator.onLangChange.subscribe((event : LangChangeEvent) => {
        this.language = event.lang;
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
