import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  similarArtists : string[] = [];

  constructor(public http : HttpClient){}

  async searchArtist():Promise<void>{
    this.result = true;

    let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + this.artist + "&api_key=e34ebf8561ba7c653a21d1d99a1a0070&format=json"));
           
      for(let a of x.similarartists.artist){
        this.similarArtists.push(a.name);
      }
    
   
    console.log(x);
  }

  newSearch():void{
    this.result = false;
  }
}
