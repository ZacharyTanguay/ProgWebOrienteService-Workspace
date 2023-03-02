import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { ShowComponent } from './show/show.component';
import { SongComponent } from './song/song.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    AlbumComponent,
    ShowComponent,
    SongComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    RouterModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/artist', pathMatch: 'full' },
      { path: 'artist', component: ArtistComponent },
      { path: 'album/:artistId', component: AlbumComponent },
      { path: 'show/:artistName', component: ShowComponent },
      { path: 'song/:artistId', component: SongComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
