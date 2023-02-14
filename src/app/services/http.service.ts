import { Album } from './../models/Album';
import { Artist } from './../models/Artist';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Song } from '../models/Song';

const CLIENT_ID = 'e05115e03d8546b3a50919372ebcd102';
const CLIENT_SECRET = '4992e896159442a6a78b0ec1433188c1';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  spotifyToken?: string;

  constructor(public httpClient: HttpClient) {}

  async connectSpotify() {
    let body = new HttpParams().set('grant_type', 'client_credentials');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
      }),
    };

    let x = await lastValueFrom(
      this.httpClient.post<any>(
        'https://accounts.spotify.com/api/token',
        body.toString(),
        httpOptions
      )
    );
    console.log(x);
    this.spotifyToken = x.access_token;
  }

  async searchArtist(artist: string): Promise<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.spotifyToken,
      }),
    };

    let x = await lastValueFrom(
      this.httpClient.get<any>(
        'https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' +
          artist,
        httpOptions
      )
    );
    console.log(x);
    return new Artist(
      x.artists.items[0].id,
      x.artists.items[0].name,
      x.artists.items[0].images[0].url
    );
  }

  async getAlbums(artist: Artist): Promise<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.spotifyToken,
      }),
    };

    let x = await lastValueFrom(
      this.httpClient.get<any>(
        'https://api.spotify.com/v1/artists/' +
          artist.id +
          '/albums?include_groups=album,single',
        httpOptions
      )
    );
    console.log(x);

    let albums = [];
    for (let i = 0; i < x.items.length; i++) {
      albums.push(
        new Album(x.items[i].id, x.items[i].name, x.items[i].images[0].url, [])
      );
    }
    return albums;
  }

  async getSongs(album: Album): Promise<Song[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.spotifyToken,
      }),
    };

    let x = await lastValueFrom(
      this.httpClient.get<any>(
        'https://api.spotify.com/v1/albums/' + album.id,
        httpOptions
      )
    );
    console.log(x);

    let songs: Song[] = [];
    for (let i = 0; i < x.tracks.items.length; i++) {
      songs.push(new Song(x.tracks.items[i].id, x.tracks.items[i].name));
    }
    return songs;
  }
}
