import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP1_SuperMusiqueInfinie';

  resultArtist = false;
  resultTrack = false;

  artist : string = "";
  album : string = "";
  track : string[]= [];
  artistAlbums : Album[] = [];
  albumTracks : Chanson[] = [];

  constructor(public http : HttpClient){}

  async searchArtist():Promise<void>{
    this.resultArtist = true;
    this.resultTrack = false; 
    let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + this.artist + "&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));
    
    console.log(x);

      for(let album of x.topalbums.album){
        this.artistAlbums.push(new Album(album.name, album.image[0]["#text"], this.track));
      }
      console.log(this.artistAlbums);
  }

  async searchTrack(album : string):Promise<void>{
    this.resultArtist = false;
    this.resultTrack = true;
    this.album = album;
    this.albumTracks = [];
    this.track = [];
    let y = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=" + this.artist + "&album=" + album  + "&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));

    for(let albumTrack of y.album.tracks.track){
      this.albumTracks.push(new Chanson(albumTrack.name));
      console.log(this.albumTracks);
    }
    
    for (let track of this.albumTracks) {
      this.track.push(track.name);
      console.log(this.track);
    }
  }

  newSearch():void{
    this.artistAlbums = [];
    this.albumTracks = [];
    this.resultArtist = false;
    this.resultTrack = false;
  }

}

class Album{
  constructor(public name : string, public image : string, public trackList : string[]){}
}

class Chanson{
  constructor(public name : string ){}
}
