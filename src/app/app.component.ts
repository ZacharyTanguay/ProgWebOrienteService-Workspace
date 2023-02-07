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

  result = false;

  artist : string = "";
  album : string = "";
  track : string = "";
  artistAlbums : Album[] = [];
  albumChansons : Chanson[] = [];

  constructor(public http : HttpClient){}

  async searchArtist():Promise<void>{
    this.result = true;
    let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + this.artist + "&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));
   
    console.log(x);

      for(let album of x.topalbums.album){
        this.artistAlbums.push(new Album(album.name, album.image[0]["#text"]));
      }
  }

  async searchAlbum():Promise<void>{
    let y = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=" + this.artist + "&album=believe" + "&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json")); 
    console.log(y);
    this.albumChansons = y.album.tracks.track;

  }

  newSearch():void{
    this.artistAlbums = [];
    this.result = false;
  }

  chanson():void{
    alert(this.albumChansons);
  }

}

class Album{
  constructor(public name : string, public image : string){}
}

class Chanson{
  constructor(public name : string ){}
}
