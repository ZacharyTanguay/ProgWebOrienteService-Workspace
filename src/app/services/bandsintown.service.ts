import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const apiKey = '2b32475766802ac01eefda45e9e42ea0'

@Injectable({
  providedIn: 'root'
})
export class BandsintownService {


constructor(public httpClient: HttpClient) { }

  async getArtist(artistName?: string) {
    return await lastValueFrom(this.httpClient.get<ShowResponse[]>('https://rest.bandsintown.com/artists/' + artistName + '/events?app_id=' + apiKey)); 
  }
}
export interface ShowResponse {
  id: string;
  datetime: string;
  venue : {
    name: string;
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}
