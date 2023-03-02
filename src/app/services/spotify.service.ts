import { Artist } from './../models/Artist';
import { Album } from '../models/Album';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Song } from '../models/Song';

const CLIENT_ID = 'e05115e03d8546b3a50919372ebcd102';
const CLIENT_SECRET = '4992e896159442a6a78b0ec1433188c1';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService implements OnInit {
  spotifyToken?: string;
  artist?: Artist;
  album?: Album[];

  constructor(public httpClient: HttpClient) {}
  ngOnInit(): void {
    this.connectSpotify();
  }

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

  getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.spotifyToken,
      }),
    };
  }

  async getArtist(artistName?: string): Promise<Artist | undefined> {
    let response = await lastValueFrom(
      this.httpClient.get<ArtistsResponse>(
        'https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' +
          artistName,
        this.getHttpOptions()
      )
    );
    console.log(response);

    return response.artists.items.map((artist) => {
      return new Artist(artist.id, artist.name, artist.images[0].url);
    })[0];
  }

  async getArtistById(id: string): Promise<Artist | undefined> {
    let response = await lastValueFrom(
      this.httpClient.get<ArtistResponse>(
        'https://api.spotify.com/v1/artists/' + id,
        this.getHttpOptions()
      )
    );
    console.log(response);

    return new Artist(response.id, response.name, response.images[0].url);
  }

  async getAlbums(artistId: string): Promise<Album[] | null> {
    let response = await lastValueFrom(
      this.httpClient.get<AlbumsResponse>(
        'https://api.spotify.com/v1/artists/' +
          artistId +
          '/albums?market=US&limit=50&include_groups=album',
        this.getHttpOptions()
      )
    );
    console.log(response);

    return response.items.map((album) => {
      return new Album(album.id, album.name, album.images[0].url);
    });
  }

  async getSongs(albumId: string): Promise<Song[] | null> {
    let x = await lastValueFrom(
      this.httpClient.get<SongsResponse>(
        'https://api.spotify.com/v1/albums/' + albumId + '/tracks?market=US',
        this.getHttpOptions()
      )
    );
    console.log(x);

    return x.items.map((song) => {
      return new Song(song.id, song.name);
    });
  }
}
interface ArtistsResponse {
  artists: {
    items: ArtistResponse[];
  };
}

interface ArtistResponse {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
}

interface AlbumsResponse {
  items: {
    id: string;
    name: string;
    images: {
      url: string;
    }[];
  }[];
}

interface SongsResponse {
  items: {
    id: string;
    name: string;
  }[];
}